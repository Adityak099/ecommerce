import { executeQuery } from "../db/Query.js";
import MissingFields from "../utils/MissingFields.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APiResponse } from "../utils/ApiResponse.js";

//code for creating Inventory:
export const createInventory = asyncHandler(async (req, res) => {
  try {
    const { product_id, supplier_id, address_id, stock } = req.body;
    const requiredFields = MissingFields({
      product_id,
      supplier_id,
      address_id,
      stock,
    });
    if (Object.keys(requiredFields).length > 0) {
      return res
        .status(400)
        .json(
          new APiResponse(400, "All fields are required", { requiredFields })
        );
    }
    const q = `SELECT * FROM inventory WHERE product_id=? AND supplier_id=? AND address_id=?;`;
    const existingInventory = await executeQuery(q, [
      product_id,
      supplier_id,
      address_id,
    ]);
    if (existingInventory.length > 0) {
      return res
        .status(409)
        .json(new APiResponse(409, "Inventory already exists"));
    }

    const query = `INSERT INTO inventory  (inventory_id,product_id, supplier_id, address_id, stock , created_at, updated_at) VALUES(?,?,?,?,?,?,?)`;
    const rows = await executeQuery(query, [
      null,
      product_id,
      supplier_id,
      address_id,
      stock,
      new Date(),
      new Date(),
    ]);
    if (rows.affectedRows !== 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to create inventory"));
    }
    const [newInventory] = await executeQuery(
      `SELECT * FROM inventory WHERE inventory_id=?`,
      [rows.insertId]
    );
    return res
      .status(200)
      .json(
        new APiResponse(200, "Inventory created successfully", newInventory)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, error.message || "Internal Server Error"));
  }
});

//Code for getting Inventory:
export const getInventory = asyncHandler(async (req, res) => {
  try {
    const q = `SELECT * FROM inventory`;
    const inventory = await executeQuery(q);
    return res
      .status(200)
      .json(new APiResponse(200, "Inventory fetched successfully", inventory));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, error.message || "Internal Server Error"));
  }
});

//Code for updating Inventory:
export const updateInventory = asyncHandler(async (req, res) => {
  try {
    const { inventory_id, stock } = req.body;
    const requiredFields = MissingFields({ inventory_id, stock });
    if (Object.keys(requiredFields).length > 0) {
      return res
        .status(400)
        .json(
          new APiResponse(400, "All fields are required", { requiredFields })
        );
    }
    const q = `UPDATE inventory SET stock=?, updated_at=? WHERE inventory_id=?;`;
    const result = await executeQuery(q, [stock, new Date(), inventory_id]);
    if (!result.affectedRows === 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to update inventory"));
    }
    const [updatedInventory] = await executeQuery(
      `SELECT * FROM inventory WHERE inventory_id=? OR stock=?`,
      [inventory_id, stock]
    );
    return res
      .status(200)
      .json(
        new APiResponse(200, "Inventory updated successfully", updatedInventory)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, error.message || "Internal Server Error"));
  }
});

//Code for getting Inventory by Id:
export const getInventoryById = asyncHandler(async (req, res) => {
  try {
    const { inventory_id } = req.body;
    const requiredFields = MissingFields({ inventory_id });
    if (Object.keys(requiredFields).length > 0) {
      return res
        .status(400)
        .json(
          new APiResponse(400, "All fields are required", { requiredFields })
        );
    }

    const q = `SELECT * FROM inventory WHERE inventory_id=?`;

    const [inventory] = await executeQuery(q, [inventory_id]);
    if (!inventory) {
      return res.status(404).json(new APiResponse(404, "Inventory not found"));
    }

    return res
      .status(200)
      .json(new APiResponse(200, "Inventory fetched successfully", inventory));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, error.message || "Internal Server Error"));
  }
});

//Code for deleting Inventory:
export const deleteInventory = asyncHandler(async (req, res) => {
  try {
    const { inventory_id } = req.body;
    if (!inventory_id) {
      return res
        .status(400)
        .json(new APiResponse(400, "Inventory id is required"));
    }
    const q = `DELETE FROM inventory WHERE inventory_id=?`;
    const result = await executeQuery(q, [inventory_id]);
    if (!result.affectedRows === 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to delete inventory"));
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(new APiResponse(404, "Inventory id is already deleted"));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "Inventory deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, error.message || "Internal Server Error"));
  }
});
