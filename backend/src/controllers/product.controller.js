import { asyncHandler } from "../utils/asyncHandler.js";
import { APiResponse } from "../utils/ApiResponse.js";
import { executeQuery } from "../../src/db/Query.js";
import { ApiError } from "../utils/ApiError.js";

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, stock_quantity,image } =
      req.body;

    if (!name) {
      return res
        .status(400)
        .json(new APiResponse(400, "Name is required", null));
    }
    if (!description) {
      return res
        .status(400)
        .json(new APiResponse(400, "Description is required", null));
    }
    if (!price) {
      return res
        .status(400)
        .json(new APiResponse(400, "Price is required", null));
    }
    if (!category) {
      return res
        .status(400)
        .json(new APiResponse(400, "Category is required", null));
    }
    if (!stock_quantity) {
      return res
        .status(400)
        .json(new APiResponse(400, "Stock is required", null));
    }
    if (!image) {
      return res
        .status(400)
        .json(new APiResponse(400, "Image is required", null));
    }

    const new_product = `INSERT INTO products (name, description, price, category, stock_quantity, image) VALUES (?, ?, ?, ?, ?, ?)`;

    const params = [name, description, price, category, stock_quantity, image];
    const s = await executeQuery(new_product, params);
    return res
      .status(201)
      .json(new APiResponse(201, "Product created successfully", null));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Internal Server Error!!!", error));
  }
});


// export const getProducts = asyncHandler(async (req, res) => {
//     try {
//         const products = `SELECT * FROM products`;
//         const result = await executeQuery(products);
//         return res
//             .status(200)
//             .json(new APiResponse(200, "Products fetched successfully", result));
//     } catch (error) {
//         return res
//             .status(500)
//             .json(new APiResponse(500, "Internal Server Error!!!", error));
//     }
// });


//code for getting products by id
export const getProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = `SELECT * FROM products WHERE id = ?`;
        const result = await executeQuery(product, [id]);
        return res
            .status(200)
            .json(new APiResponse(200, "Product fetched successfully", result));
    } catch (error) {
        return res
            .status(500)
            .json(new APiResponse(500, "Internal Server Error!!!", error));
    }
});

export const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock_quantity, image } = req.body;
        const update_product = `UPDATE products SET name = ?, description = ?, price = ?, category = ?, stock_quantity = ?, image = ? WHERE id = ?`;
        const params = [name, description, price, category, stock_quantity, image, id];
        const result = await executeQuery(update_product, params);
        return res
            .status(200)
            .json(new APiResponse(200, "Product updated successfully", null));
    } catch (error) {
        return res
            .status(500)
            .json(new APiResponse(500, "Internal Server Error!!!", error));
    }
});

export const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const delete_product = `DELETE FROM products WHERE id = ?`;
        const result = await executeQuery(delete_product, [id]);
        return res
            .status(200)
            .json(new APiResponse(200, "Product deleted successfully", null));
    } catch (error) {
        return res
            .status(500)
            .json(new APiResponse(500, "Internal Server Error!!!", error));
    }
});

export const getProductsByCategory = asyncHandler(async (req, res) => {
    try {
        const { category } = req.params;
        const products = `SELECT * FROM products WHERE category = ?`;
        const result = await executeQuery(products, [category]);
        return res
            .status(200)
            .json(new APiResponse(200, "Products fetched successfully", result));
    } catch (error) {
        return res
            .status(500)
            .json(new APiResponse(500, "Internal Server Error!!!", error));
    }
});