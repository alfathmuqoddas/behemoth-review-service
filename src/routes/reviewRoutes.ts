import { Router } from "express";
import {
  getAllReviews,
  getAllReviewsByMovie,
  getAllReviewsByUser,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/get", authMiddleware, getAllReviews);
router.get("/get/:movieId", getAllReviewsByMovie);
router.get("/get/:userId", getAllReviewsByUser);
router.post("/add", authMiddleware, createReview);
router.put("/update/:id", authMiddleware, updateReview);
router.delete("/delete/:id", authMiddleware, deleteReview);

export default router;
