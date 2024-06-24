import { executeQuery } from "../db/Query.js";
import {
  deleteSubCategoryQuery,
  getAllSubCategoriesQuery,
  getSubCategoryByIdQuery,
  getSubCategoryByNameQuery,
  newSubCategoryQuery,
} from "../models/sub_category.query.js";
import { APiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const newSubCategory = asyncHandler(async (req, res) => {
  try {
    const { name, parent_id, description } = req.body;
    const missingFields = {};
    if (!name) {
      missingFields.name = "Sub category name is required";
    }
    if (!parent_id) {
      missingFields.parent_id = "Parent category id is required";
    }
    if (!description) {
      missingFields.description = "Description is required";
    }

    if (Object.keys(missingFields).length > 0) {
      return res
        .status(400)
        .json(new APiResponse(400, "All fields are required", missingFields));
    }
    const isSubCategoryExisting = await executeQuery(
      getSubCategoryByNameQuery,
      [name.trim()]
    );
    if (isSubCategoryExisting.length > 0) {
      return res
        .status(409)
        .json(new APiResponse(409, "Sub category already exist"));
    }
    const result = await executeQuery(newSubCategoryQuery, [
      null,
      name.trim(),
      description.trim(),
      parent_id,
    ]);
    if (result.affectedRows !== 1) {
      return res
        .status(400)
        .json(new APiResponse(400, "Failed to create sub category"));
    }
    const [row] = await executeQuery(getSubCategoryByIdQuery, [
      result.insertId,
    ]);
    return res
      .status(201)
      .json(new APiResponse(201, "Sub category created", row));
  } catch (error) {
    return res.status(500).json(new APiResponse(500, "Internal server error"));
  }
});
export const deleteSubCategory = asyncHandler(async (req, res) => {
  const { sub_category_id } = req.body;
  if (!sub_category_id) {
    return res
      .status(400)
      .json(new APiResponse(400, "Sub category id is required"));
  }
  const result = await executeQuery(deleteSubCategoryQuery, [sub_category_id]);
  if (result.affectedRows === 0) {
    return res.status(404).json(new APiResponse(404, "Review does not exist"));
  }

  if (result.affectedRows !== 1) {
    return res
      .status(500)
      .json(new APiResponse(500, "Failed to delete review"));
  }
  return res
    .status(200)
    .json(new APiResponse(200, "Sub category deleted successfully"));
});
export const getAllSubCategories = asyncHandler(async (req, res) => {
  try {
    const result = await executeQuery(getAllSubCategoriesQuery);
    if (result.length < 1) {
      return res
        .status(404)
        .json(new APiResponse(404, "No sub category found"));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "All sub categories", result));
  } catch (error) {
    return res.status(500).json(new APiResponse(500, "Internal server error"));
  }
});
export const updateSubCategory = asyncHandler(async (req, res) => {
  try {
    const { sub_category_id, name, description } = req.body;
    if (!sub_category_id) {
      return res
        .status(400)
        .json(new APiResponse(400, "Sub category id is required"));
    }
    if (name) {
      const q = `UPDATE sub_category SET name = '${name}' WHERE sub_category_id = ${sub_category_id}`;
      const result = await executeQuery(q, [name]);
      if (result.affectedRows !== 1) {
        return res
          .status(400)
          .json(new APiResponse(400, "Failed to update Sub Category Name"));
      }
    }
    if (description) {
      const q = `UPDATE sub_category SET description = '${description}' WHERE sub_category_id = ${sub_category_id}`;
      const result = await executeQuery(q, [description]);
      if (result.affectedRows !== 1) {
        return res
          .status(400)
          .json(
            new APiResponse(400, "Failed to update Sub Category Description")
          );
      }
    }

    const [row] = await executeQuery(getSubCategoryByIdQuery, [
      sub_category_id,
    ]);
    return res
      .status(200)
      .json(new APiResponse(200, "Sub category updated successfully", row));
  } catch (error) {
    return res.status(500).json(new APiResponse(500, "Internal server error"));
  }
});
export const getSubCategoryById = asyncHandler(async (req, res) => {
  try {
    const { sub_category_id } = req.body;
    if (!sub_category_id) {
      return res
        .status(400)
        .json(new APiResponse(400, "Sub category id is required"));
    }
    const [row] = await executeQuery(getSubCategoryByIdQuery, [
      sub_category_id,
    ]);
    if (!row) {
      return res
        .status(404)
        .json(new APiResponse(404, "Sub category not found"));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "Sub category found", row));
  } catch (error) {
    return res.status(500).json(new APiResponse(500, "Internal server error"));
  }
});
