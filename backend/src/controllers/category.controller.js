import { executeQuery } from "../db/Query.js";
import { APiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getAllCategoriesQuery,
  getCategoryByIdQuery,
  getCategoryByNameQuery,
  getCategoryQuery,
} from "../models/category.query.js";

export const createNewCategory = asyncHandler(async (req, res) => {
  try {
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
    const isCategoryExist = await executeQuery(getCategoryByNameQuery, [name]);
    if (isCategoryExist.length > 0) {
      return res
        .status(400)
        .json(new APiResponse(400, "Category already exist", null));
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
  } catch (error) {
    return res.status(500).json(new APiResponse(500, error.message, null));
  }
});

export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { category_id } = req.body || req.params;
    if (!category_id) {
      return res
        .status(400)
        .json(new APiResponse(400, "Category ID is required", null));
    }
    const q = `DELETE FROM category WHERE category_id = ?;`;
    const result = await executeQuery(q, [category_id]);
    if (!result.affectedRows === 1) {
      return res
        .status(500)
        .json(new APiResponse(201, "Failed to delete Category", null));
    }
    return res
      .status(201)
      .json(new APiResponse(201, "Category deleted successfully", null));
  } catch (error) {
    return res.status(500).json(new APiResponse(500, error.message, null));
  }
});
export const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await executeQuery(getAllCategoriesQuery);
    return res
      .status(200)
      .json(
        new APiResponse(200, "Categories fetched successfully", categories)
      );
  } catch (error) {
    return res.status(500).json(new APiResponse(500, error.message, null));
  }
});
export const getCategoryById = asyncHandler(async (req, res) => {
  const { category_id } = req.body || req.params;
  if (!category_id) {
    return res
      .status(400)
      .json(new APiResponse(400, "Category Id is Required", null));
  }
  const result = await executeQuery(getCategoryByIdQuery, [category_id]);
  console.log(result);
  return res
    .status(200)
    .json(new APiResponse(200, "Category Fetched Successfully", result));
});
export const updateCategory = asyncHandler(async (req, res) => {
  // try {
  const { category_id, name, description } = req.body;
  const updatedValues = {};

  if (name && description) {
    const q = `UPDATE category SET category_name =?, description =? WHERE category_id = ?;`;
    const result = await executeQuery(q, [name, description, category_id]);

    if (result.affectedRows !== 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to update Category", null));
    }

    return res.status(200).json(
      new APiResponse(200, "Category updated successfully", {
        category_id,
        name,
        description,
      })
    );
  }

  if (!category_id) {
    return res
      .status(400)
      .json(new APiResponse(400, "Category ID is required", null));
  }
  if (name) {
    const q = `UPDATE category SET category_name = ? WHERE category_id = ?;`;
    const result = await executeQuery(q, [name, category_id]);
    if (!result.affectedRows === 1) {
      return res
        .status(500)
        .json(new APiResponse(201, "Failed to update Category", null));
    }
    updatedValues.name = name;
  }
  if (description) {
    const q = `UPDATE category SET description = ? WHERE category_id = ?;`;
    const result = await executeQuery(q, [description, category_id]);
    if (!result.affectedRows === 1) {
      return res
        .status(500)
        .json(new APiResponse(201, "Failed to update Category", null));
    }
    updatedValues.description = description;
  }
  return res
    .status(201)
    .json(new APiResponse(201, "Category updated successfully", updatedValues));
  // } catch (error) {
  return res.status(500).json(new APiResponse(500, error.message, null));
  // }
});
