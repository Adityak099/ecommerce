import { asyncHandler } from "../utils/asyncHandler.js";
import { APiResponse } from "../utils/ApiResponse.js";
import { executeQuery } from "../db/Query.js";

// Create Order Item: Add a new item to an order.
export const createOrderItem = asyncHandler(async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    // Validate input
    if (!product_id || !quantity) {
      return res
        .status(400)
        .json(
          new APiResponse(400, "Product ID and quantity are required", null)
        );
    }
    // Insert query
    const insertQuery = `INSERT INTO order_item (product_id, quantity, status,created_at,updated_at) VALUES (?, ?,?,?, ?);`;
    const result = await executeQuery(insertQuery, [
      product_id,
      quantity,
      "PENDING",
      new Date(),
      new Date(),
    ]);

    // Check if the insertion was successful
    if (result.affectedRows !== 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to create order item", null));
    }

    const q = `SELECT * FROM order_item WHERE item_id=?;`;
    const item = await executeQuery(q, [result.insertId]);
    if (!item.length) {
      return res
        .status(404)
        .json(new APiResponse(404, "Order item not found", null));
    }

    return res
      .status(201)
      .json(new APiResponse(201, "Order item created successfully", item));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Internal Server Error", error.message));
  }
});

// Update Order Item: Update an existing order item.
export const updateOrderItem = asyncHandler(async (req, res) => {
  //   try {
  const { item_id, product_id, quantity, status } = req.body;

  // Validate input
  if (!item_id || !product_id || !quantity) {
    return res
      .status(400)
      .json(
        new APiResponse(
          400,
          "Item ID, product ID, and quantity are required",
          null
        )
      );
  }

  if (
    status &&
    !["PENDING", "TRANSIT", "DELIVERED", "CANCELLED"].includes(status)
  ) {
    return res
      .status(400)
      .json(
        new APiResponse(
          400,
          "Invalid status. Must be one of: PENDING, TRANSIT, DELIVERED, CANCELLED",
          null
        )
      );
  }

  const query = `
      UPDATE order_item
      SET product_id = ?, quantity = ?, status = ?
      WHERE item_id = ?;
    `;

  const result = await executeQuery(query, [
    product_id,
    quantity,
    status || "PENDING",
    item_id,
  ]);

  if (result.affectedRows !== 1) {
    return res
      .status(500)
      .json(new APiResponse(500, "Failed to update order item", null));
  }

  return res
    .status(200)
    .json(new APiResponse(200, "Order item updated successfully", null));
  //   } catch (error) {
  return res
    .status(500)
    .json(new APiResponse(500, "Internal Server Error", error.message));
  //   }
});

export const deleteOrderItem = asyncHandler(async (req, res) => {
  try {
    const { item_id } = req.body;

    if (!item_id) {
      return res
        .status(400)
        .json(new APiResponse(400, "Item ID is required", null));
    }

    const q = `DELETE FROM order_item WHERE item_id =?;`;
    const result = await executeQuery(q, [item_id]);
    if (result.affectedRows !== 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to delete order item", null));
    }

    return res
      .status(200)
      .json(new APiResponse(200, "Order item deleted successfully", null));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Internal Server Error", error.message));
  }
});

// Get All Order Items: Get all order items.
export const getAllOrderItems = asyncHandler(async (req, res) => {
  try {
    const q = `SELECT * FROM order_item;`;
    const items = await executeQuery(q);

    return res
      .status(200)
      .json(new APiResponse(200, "Order items retrieved successfully", items));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Internal Server Error", error.message));
  }
});

// Get Order Item by ID: Get a specific order item by ID.
export const getOrderItemById = asyncHandler(async (req, res) => {
  const { item_id } = req.body;

  if (!item_id) {
    return res
      .status(400)
      .json(new APiResponse(400, "Item ID is required", null));
  }

  const q = `SELECT * FROM order_item WHERE item_id =?;`;
  const item = await executeQuery(q, [item_id]);
  if (!item.length) {
    return res
      .status(404)
      .json(new APiResponse(404, "Order item not found", null));
  }

  return res
    .status(200)
    .json(new APiResponse(200, "Order item retrieved successfully", item));
});

export default {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
