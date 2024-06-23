import { executeQuery } from "../db/Query.js";
import { getCategoryQuery } from "../models/category.query.js";
import { APiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createNewCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res
      .status(400)
      .json(new APiResponse(400, "Category name is required", null));
  }
  if (!description) {
    return res
      .status(400)
      .json(new APiResponse(400, "Category description is required", null));
  }
  const q = `INSERT INTO category (category_id,category_name,description) VALUES ( ?,?,?);`;
  const result = await executeQuery(q, [null, name, description]);
  if (!result.affectedRows === 1) {
    return res
      .status(500)
      .json(new APiResponse(201, "Failed to create Category", null));
  }
  const [category] = await executeQuery(getCategoryQuery, [result.insertId]);
  return res
    .status(201)
    .json(new APiResponse(201, "Category created successfully", category));
});

export const deleteCategory = asyncHandler(async (req, res) => {});
export const getAllCategories = asyncHandler(async (req, res) => {});
export const getCategory = asyncHandler(async (req, res) => {});
export const updateCategory = asyncHandler(async (req, res) => {});
