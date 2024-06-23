/*
1. Create Order Item = POST /order-items;
2. Get All Order Items = GET /order-items;
3. Get Order Item by ID = GET /order-items/:item_id;
4. Update Order Item= PATCH /order-items/:item_id;
5. Delete Order Item = DELETE /order-items/:item_id;

CREATE TABLE order_item(
    item_id int NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
    product_id int NOT NULL,
    quantity int NOT NULL DEFAULT 1,
	status ENUM('PENDING', 'TRANSIT', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT "PENDING",
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);


*/

import { asyncHandler } from "../utils/asyncHandler.js";
import { APiResponse } from "../utils/httpResponse.js";
import { executeQuery } from "../utils/db.js"


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

    //const status = "PENDING"; // Default status

    // Insert query
    const insertQuery = `INSERT INTO order_items (product_id, quantity, status,created_at,updated_at) VALUES (?, ?,?,?, ?);`;
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

    const q = `SELECT * FROM order_item WHERE order_id=?;`;
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
  const { item_id } = req.params;
  const { product_id, quantity, status } = req.body;

  if (!item_id || !product_id || !quantity || !status) {
    return res
      .status(400)
      .json(
        new APiResponse(
          400,
          "Item ID, Product ID, Quantity, and Status are required",
          null
        )
      );
  }

  if (!["PENDING", "TRANSIT", "DELIVERED", "CANCELLED"].includes(status)) {
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

  const q = `UPDATE order_item SET product_id =?, quantity =?, status =? WHERE item_id =?;`;
  const result = await executeQuery(q, [product_id, quantity, status, item_id]);
  if (result.affectedRows !== 1) {
    return res
      .status(500)
      .json(new APiResponse(500, "Failed to update order item", null));
  }

  return res
    .status(200)
    .json(new APiResponse(200, "Order item updated successfully", null));
});
