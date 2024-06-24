import { APiResponse } from "../utils/ApiResponse.js";
import MissingFields from "../utils/MissingFields.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { executeQuery } from "../db/Query.js";
export const createOrder = asyncHandler(async (req, res) => {
  try {
    const { item_id, payment_id, total_amount } = req.body;
    const missingItems = MissingFields({
      item_id,
      total_amount,
    });
    if (Object.keys(missingItems).length > 0) {
      return res
        .status(400)
        .json(
          new APiResponse(400, "All fields are required", { missingItems })
        );
    }
    const existingOrder = await executeQuery(
      `SELECT * FROM orders WHERE item_id=? AND user_id=?`,
      [item_id, req.id]
    );
    if (existingOrder.length > 0) {
      return res.status(409).json(new APiResponse(409, "Order already exists"));
    }
    const q = `INSERT INTO orders (order_id,user_id, item_id, payment_id, total_amount,status,created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await executeQuery(q, [
      null,
      req.id,
      item_id,
      null,
      total_amount,
      "PENDING",
      new Date(),
      new Date(),
    ]);
    if (!result.affectedRows === 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to create Order"));
    }
    const [newOrder] = await executeQuery(
      `SELECT * FROM orders WHERE order_id=?`,
      [result.insertId]
    );
    return res
      .status(200)
      .json(new APiResponse(200, "Order created successfully", newOrder));
  } catch (error) {
    return res.status(500).json(new APiResponse(500, error.message));
  }
});

export const getOrders = asyncHandler(async (req, res) => {
  try {
    const q = `SELECT * FROM orders WHERE user_id=?`;
    const orders = await executeQuery(q, [req.id]);
    return res
      .status(200)
      .json(new APiResponse(200, "Orders fetched successfully", orders));
  } catch (error) {
    return res.status(500).json(new APiResponse(500, error.message));
  }
});

export const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const { order_id } = req.body;
    if (!order_id) {
      return res.status(400).json(new APiResponse(400, "Order ID is required"));
    }
    const q = `DELETE FROM orders WHERE order_id=? AND user_id=?`;
    const result = await executeQuery(q, [order_id, req.id]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(new APiResponse(404, "Review does not exist"));
    }

    if (result.affectedRows !== 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to delete review"));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "Order deleted successfully"));
  } catch (error) {
    return res.status(500).json(new APiResponse(500, error.message));
  }
});
export const getOrder = asyncHandler(async (req, res) => {
  try {
    const { order_id } = req.body;
    const missingItems = MissingFields({ order_id });
    if (Object.keys(missingItems).length > 0) {
      return res
        .status(400)
        .json(
          new APiResponse(400, "All fields are required", { missingItems })
        );
    }
    const q = `SELECT * FROM orders WHERE order_id=? AND user_id=?`;
    const [order] = await executeQuery(q, [order_id, req.id]);
    if (!order) {
      return res.status(404).json(new APiResponse(404, "Order not found"));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "Order fetched successfully", order));
  } catch (error) {
    return res.status(500).json(new APiResponse(500, error.message));
  }
});
export const updateOrder = asyncHandler(async (req, res) => {
  try {
    const { order_id, status } = req.body;
    const missingItems = MissingFields({ order_id, status });
    if (Object.keys(missingItems).length > 0) {
      return res
        .status(400)
        .json(
          new APiResponse(400, "All fields are required", { missingItems })
        );
    }
    const q = `UPDATE orders SET status=?,updated_at = ? WHERE order_id=? AND user_id=?`;
    const result = await executeQuery(q, [
      status,
      new Date(),
      order_id,
      req.id,
    ]);
    if (!result.affectedRows === 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to update Order"));
    }
    const [updatedOrder] = await executeQuery(
      `SELECT * FROM orders WHERE order_id=?`,
      [order_id]
    );
    return res
      .status(200)
      .json(new APiResponse(200, "Order updated successfully", updatedOrder));
  } catch (error) {
    return res.status(500).json(new APiResponse(500, error.message));
  }
});
