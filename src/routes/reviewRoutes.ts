import { Router } from "express";
import {
  get,
  create,
  update,
  deleteReview,
} from "../controllers/reviewController";

const router = Router();

router.get("/${movieId}", get);
router.post("/", create);
router.put("/${id}", update);
router.delete("/${id}", deleteReview);

export default router;
