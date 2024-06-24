import { executeQuery } from "../db/Query.js";
import MissingFields from "../utils/MissingFields.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APiResponse } from "../utils/ApiResponse.js";

/*CREATE TABLE reviews(
    review_id INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT UNIQUE,
    product_id INT NOT NULL,
    user_id BIGINT NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK (
        rating >= 0
        AND rating <= 5
    ),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);*/

//code for creating Review:
export const createReview = asyncHandler(async (req, res) => {
  try {
    const { product_id, rating, review } = req.body;
    const requiredFields = MissingFields({
      product_id,
      // user_id,
      rating,
      review,
    });
    if (Object.keys(requiredFields).length > 0) {
      return res
        .status(400)
        .json(
          new APiResponse(400, "All fields are required", { requiredFields })
        );
    }
    const q = `SELECT * FROM reviews WHERE product_id=? AND user_id=?;`;
    const existingReview = await executeQuery(q, [product_id, req.id]);
    if (existingReview.length > 0) {
      return res
        .status(409)
        .json(new APiResponse(409, "Review already exists", {}));
    }

    const query = `INSERT INTO reviews  (review_id,product_id, user_id, rating, review, created_at, updated_at) VALUES(?,?,?,?,?,?,?);`;
    const rows = await executeQuery(query, [
      null,
      product_id,
      req.id,
      rating,
      review,
      new Date(),
      new Date(),
    ]);
    if (rows.affectedRows !== 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to create review"));
    }
    const [newReview] = await executeQuery(
      `SELECT * FROM reviews WHERE review_id=? AND user_id=?;`,
      [rows.insertId, req.id]
    );
    return res
      .status(200)
      .json(new APiResponse(200, "Review created successfully", newReview));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Failed to create review"));
  }
});

//code for getting all reviews:
export const getReviews = asyncHandler(async (req, res) => {
  try {
    const reviews = await executeQuery(`SELECT * FROM reviews`);
    return res
      .status(200)
      .json(new APiResponse(200, "Reviews fetched successfully", reviews));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Failed to fetch reviews"));
  }
});

//code for getting a review by id:
export const getReview = asyncHandler(async (req, res) => {
  try {
    const { review_id } = req.body;
    if (!review_id) {
      return res
        .status(400)
        .json(new APiResponse(400, "Review id is required"));
    }
    const review = await executeQuery(
      `SELECT * FROM reviews WHERE review_id=? AND user_id=?;`,
      [review_id, req.id]
    );
    if (review.length === 0) {
      return res.status(404).json(new APiResponse(404, "Review not found", {}));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "Review fetched successfully", review));
  } catch (error) {
    return res.status(500).json(new APiResponse(500, "Failed to fetch review"));
  }
});

//code for updating a review by id:
export const updateReview = asyncHandler(async (req, res) => {
  try {
    const { review_id, rating, review } = req.body;
    const requiredFields = MissingFields({ review_id, rating, review });
    if (Object.keys(requiredFields).length > 0) {
      return res
        .status(400)
        .json(
          new APiResponse(400, "All fields are required", { requiredFields })
        );
    }
    const query = `UPDATE reviews SET rating=?, review=?, updated_at=? WHERE review_id=?;`;
    const rows = await executeQuery(query, [
      rating,
      review,
      new Date(),
      review_id,
    ]);
    if (rows.affectedRows !== 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to update review"));
    }

    const [updatedReview] = await executeQuery(
      `SELECT * FROM reviews WHERE review_id=?`,
      [review_id]
    );
    return res
      .status(200)
      .json(new APiResponse(200, "Review updated successfully", updatedReview));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Failed to update review"));
  }
});

//code for deleting a review by id:
export const deleteReview = asyncHandler(async (req, res) => {
  // try {
  const { review_id } = req.body;
  if (!review_id) {
    return res.status(400).json(new APiResponse(400, "Review id is required"));
  }

  const query = `DELETE FROM reviews WHERE review_id=? AND user_id=?;`;
  const rows = await executeQuery(query, [review_id, req.id]);

  if (rows.affectedRows === 0) {
    return res.status(404).json(new APiResponse(404, "Review does not exist"));
  }

  if (rows.affectedRows !== 1) {
    return res
      .status(500)
      .json(new APiResponse(500, "Failed to delete review"));
  }
  return res
    .status(200)
    .json(new APiResponse(200, "Review deleted successfully"));
  // } catch (error) {
  return res.status(500).json(new APiResponse(500, "Failed to delete review"));
  // }
});
