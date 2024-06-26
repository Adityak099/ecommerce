import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/reviews.controller.js";

const router = Router();
router.use(verifyJwt);

// Create a new review
router.route("/new-review").post(createReview);

// Get all reviews
router.route("/get-reviews").get(getReviews);

// Get a review by id
router.route("/get-review").get(getReview);

// Update a review by id
router.route("/update-review").patch(updateReview);

// Delete a review by id
router.route("/delete-review").delete(deleteReview);

export default router;
