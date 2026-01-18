import { Request, Response } from "express";
import Review from "../models/Review";
import { AuthRequest } from "../middleware/authMiddleware";
import { AppError } from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import { reviewsCreatedTotal } from "../config/metrics";
import logger from "../config/logger";
import { getPagination, formatPaginatedResponse } from "../utils/pagination";

export const getAllReviewsByMovie = catchAsync(
  async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const { limit, offset, currentPage } = getPagination(
      req.query.page,
      req.query.size,
    );

    const { count, rows } = await Review.findAndCountAll({
      where: {
        movieId,
      },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    logger.info(`Found ${count} reviews for movie ${movieId}`);

    res
      .status(200)
      .json(formatPaginatedResponse(count, limit, currentPage, rows));
  },
);

export const getAllReviewsByUser = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      logger.warn(`User ID not found in request.`);
      throw new AppError(401, "Unauthorized");
    }

    const { limit, offset, currentPage } = getPagination(
      req.query.page,
      req.query.size,
    );

    const { count, rows } = await Review.findAndCountAll({
      where: {
        userId,
      },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    logger.info(`Found ${count} reviews for user ${userId}`);

    res
      .status(200)
      .json(formatPaginatedResponse(count, limit, currentPage, rows));
  },
);

export const getAllReviews = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== "admin") {
      logger.warn(
        `User ${req.user?.userId} attempted to view all reviews without authorization.`,
      );
      throw new AppError(403, "Forbidden: Only admins can view all reviews");
    }

    const { limit, offset, currentPage } = getPagination(
      req.query.page,
      req.query.size,
    );

    const { count, rows } = await Review.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    logger.info(`Found ${count} reviews`);

    res
      .status(200)
      .json(formatPaginatedResponse(count, limit, currentPage, rows));
  },
);

export const createReview = catchAsync(async (req: Request, res: Response) => {
  const review = await Review.create(req.body);
  reviewsCreatedTotal.inc();
  logger.info(`Review ${review.id} created by user ${review.userId}.`);
  res.status(201).json(review);
});

export const updateReview = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    const userRole = req.user?.role;

    const review = await Review.findByPk(id);
    if (!review) {
      logger.warn(`Review ${id} not found.`);
      throw new AppError(404, "Review not found");
    }
    if (review.userId !== userId && userRole !== "admin") {
      logger.warn(
        `User ${userId} attempted to update review ${id} without authorization.`,
      );
      throw new AppError(403, "You are not authorized to update this review");
    }

    await review.update(req.body);
    logger.info(`Review ${id} updated by user ${userId}.`);
    res.status(200).json(review);
  },
);

export const deleteReview = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    const userRole = req.user?.role;

    const review = await Review.findByPk(id);
    if (!review) {
      logger.warn(`Review ${id} not found.`);
      throw new AppError(404, "Review not found");
    }

    if (review.userId !== userId && userRole !== "admin") {
      logger.warn(
        `User ${userId} attempted to delete review ${id} without authorization.`,
      );
      throw new AppError(403, "You are not authorized to delete this review");
    }

    await review.destroy();
    logger.info(`Review ${id} deleted by user ${userId}.`);
    res.status(204).send();
  },
);
