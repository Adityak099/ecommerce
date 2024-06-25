import { executeQuery } from "../db/Query.js";
import { APiResponse } from "../utils/ApiResponse.js";
import MissingFields from "../utils/MissingFields.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//code for creating Discount:
export const createDiscount = asyncHandler(async (req, res) => {
  try {
    const { name, description, percentage, start_Date, end_Date } = req.body;
    const requiredFields = MissingFields({
      name,
      description,
      percentage,
      start_Date,
      end_Date,
    });
    if (Object.keys(requiredFields).length > 0) {
      return res
        .status(400)
        .json(
          new APiResponse(400, "All fields are required", { requiredFields })
        );
    }
    const query = `INSERT INTO discounts (discount_id, name, description, percentage, start_Date, end_Date, created_at) VALUES (?,?,?,?,?,?,?);`;
    const result = await executeQuery(query, [
      null,
      name,
      description,
      percentage,
      start_Date,
      end_Date,
      new Date(),
    ]);
    if (!result.affectedRows === 0) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to create discount"));
    }
    return res
      .status(201)
      .json(new APiResponse(201, "Discount created successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Failed to create discount."));
  }
});

//Code for getting all discounts:
export const getDiscounts = asyncHandler(async (req, res) => {
  try {
    const query = `SELECT * FROM discounts;`;
    const result = await executeQuery(query);
    if (!result.length) {
      return res.status(404).json(new APiResponse(404, "No discounts found"));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "Discounts found", { discounts: result }));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Failed to get discounts"));
  }
});

//Code for getting a discount by id:
export const getDiscount = asyncHandler(async (req, res) => {
  //   try {
  const { discount_id } = req.body;
  const requiredFields = MissingFields({ discount_id });
  if (Object.keys(requiredFields).length > 0) {
    return res
      .status(400)
      .json(
        new APiResponse(400, "All fields are required", { requiredFields })
      );
  }
  const query = `SELECT * FROM discounts WHERE discount_id = ? ;`;
  const result = await executeQuery(query, [discount_id]);
  if (!result.length) {
    return res.status(404).json(new APiResponse(404, "Discount not found"));
  }
  return res
    .status(200)
    .json(new APiResponse(200, "Discount found", { discount: result }));
  //   } catch (error) {
  return res.status(500).json(new APiResponse(500, "Failed to get discount"));
  //   }
});

//Code for updating a discount:
export const updateDiscount = asyncHandler(async (req, res) => {
  try {
    const { discount_id, name, description, percentage, start_Date, end_Date } =
      req.body;
    const requiredFields = MissingFields({
      discount_id,
      name,
      description,
      percentage,
      start_Date,
      end_Date,
    });
    if (Object.keys(requiredFields).length > 0) {
      return res
        .status(400)
        .json(
          new APiResponse(400, "All fields are required", { requiredFields })
        );
    }
    const query = `UPDATE discounts SET name = ?, description = ?, percentage = ?, start_Date = ?, end_Date = ? WHERE discount_id = ?;`;
    const result = await executeQuery(query, [
      name,
      description,
      percentage,
      start_Date,
      end_Date,
      discount_id,
    ]);
    if (!result.affectedRows === 0) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to update discount"));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "Discount updated successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Failed to update discount."));
  }
});

//Code for deleting a discount:
export const deleteDiscount = asyncHandler(async (req, res) => {
  try {
    const { discount_id } = req.body;
    const requiredFields = MissingFields({ discount_id });
    if (!discount_id) {
      return res
        .status(400)
        .json(new APiResponse(400, "Discount ID is required", null));
    }
    const query = `DELETE FROM discounts WHERE discount_id = ?;`;
    const result = await executeQuery(query, [discount_id]);
    if (!result.affectedRows === 0) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to delete discount"));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "Discount deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Failed to delete discount."));
  }
});

//Code for getting all discounts for a particular product: 
//<HAVE SOME ISSUES WITH THIS ROUTE>
export const getDiscountsForProduct = asyncHandler(async (req, res) => {
  // try {
  const { product_id } = req.body;
  const requiredFields = MissingFields({ product_id });
  if (Object.keys(requiredFields).length > 0) {
    return res
      .status(400)
      .json(
        new APiResponse(400, "All fields are required", { requiredFields })
      );
  }
  const query = `SELECT * FROM discounts WHERE product_id = ?;`;
  const result = await executeQuery(query, [product_id]);
  if (!result.length) {
    return res
      .status(404)
      .json(new APiResponse(404, "No discounts found for this product"));
  }
  return res
    .status(200)
    .json(new APiResponse(200, "Discounts found", { discounts: result }));
  // } catch (error) {
  return res
    .status(500)
    .json(new APiResponse(500, "Failed to get discounts for this product"));
  // }
});

