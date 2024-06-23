import { asyncHandler } from "../utils/asyncHandler.js";
import { APiResponse } from "../utils/ApiResponse.js";
import { executeQuery } from "../../src/db/Query.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category_id, stock } = req.body;

    if (!name) {
      return res
        .status(400)
        .json(new APiResponse(400, "Name is required", null));
    }
    const isExistingProductQuery = `SELECT 1 FROM product WHERE name = ? LIMIT 1;`;
    const isProductExisting = await executeQuery(isExistingProductQuery, [
      name,
    ]);
    if (isProductExisting.length > 0) {
      return res
        .status(409)
        .json(new APiResponse(409, "Product already exists", null));
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
    if (!category_id) {
      return res
        .status(400)
        .json(new APiResponse(400, "Category is required", null));
    }
    if (!stock) {
      return res
        .status(400)
        .json(new APiResponse(400, "Stock is required", null));
    }
    const image_Local_Path = req.files?.image[0].path;
    console.log(image_Local_Path);
    if (!image_Local_Path) {
      return res
        .status(400)
        .json(new APiResponse(400, "Image is required", null));
    }
    const uploadImage = await uploadToCloudinary(image_Local_Path);
    const new_product = `INSERT INTO product (product_id,name, category_id,stock,description, price,image,created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      null,
      name,
      category_id,
      stock,
      description,
      price,
      uploadImage.url || null,
      new Date(),
      new Date(),
    ];
    const s = await executeQuery(new_product, params);
    if (!s.affectedRows === 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to create product", null));
    }
    const q = `SELECT * FROM product WHERE product_id=?;`;
    const [result] = await executeQuery(q, [s.insertId]);

    return res
      .status(201)
      .json(new APiResponse(201, "Product created successfully.", result));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Internal Server Error!!!", error));
  }
});

//code for getting products by id
export const getProductId = asyncHandler(async (req, res) => {
  try {
    const { product_id } = req.body;
    if (!product_id) {
      return res
        .status(400)
        .json(new APiResponse(400, "Product ID is required", null));
    }
    const product = `SELECT * FROM product WHERE product_id = ?`;
    const [result] = await executeQuery(product, [product_id]);
    if (!result) {
      return res
        .status(404)
        .json(new APiResponse(404, "Product not found", null));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "Product fetched successfully", result));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Internal Server Error!!!", error));
  }
});

//code for getting products by category Id
export const getProductsByCategoryId = asyncHandler(async (req, res) => {
  try {
    const { category_id } = req.body;
    const products = `SELECT * FROM product WHERE category_id = ?`;
    if (!category_id) {
      return res
        .status(400)
        .json(new APiResponse(400, "Category ID is required", null));
    }
    const result = await executeQuery(products, [category_id]);
    if (!result) {
      return res
        .status(404)
        .json(new APiResponse(404, "Category not found", null));
    }

    return res
      .status(200)
      .json(new APiResponse(200, "Products fetched successfully", result));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Internal Server Error!!!", error));
  }
});

//code for getting all products
export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = `SELECT * FROM product`;
    const result = await executeQuery(products);
    return res
      .status(200)
      .json(new APiResponse(200, "Products fetched successfully", result));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Internal Server Error!!!", error));
  }
});

//code for updating product
export const updateProduct = asyncHandler(async (req, res) => {
  const { product_id } = req.body;
  const { name, description, price, category_id, stock } = req.body;

  if (!product_id) {
    return res
      .status(400)
      .json(new APiResponse(400, "Product ID is required", null));
  }

  if (name) {
    const q = ` UPDATE product SET name =? , updated_at =? WHERE product_id =?;`;
    const result = await executeQuery(q, [name, new Date(), product_id]);
    if (result.affectedRows !== 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to update product", null));
    }
  }

  if (description) {
    const q = ` UPDATE product SET description =? ,updated_at =? WHERE product_id =?;`;
    const result = await executeQuery(q, [description, new Date(), product_id]);
    if (result.affectedRows !== 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to update product", null));
    }
  }

  if (price) {
    const q = ` UPDATE product SET price =?,updated_at =? WHERE product_id =?;`;
    const result = await executeQuery(q, [price, new Date(), product_id]);
    if (result.affectedRows !== 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to update product", null));
    }
  }

  if (category_id) {
    const q = ` UPDATE product SET category_id =? updated_at =? WHERE product_id =?;`;
    const result = await executeQuery(q, [category_id, new Date(), product_id]);
    if (result.affectedRows !== 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to update product", null));
    }
  }

  if (stock) {
    const q = ` UPDATE product SET stock =?, updated_at =? WHERE product_id =?;`;
    const result = await executeQuery(q, [stock, new Date(), product_id]);
    if (result.affectedRows !== 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to update product", null));
    }
  }

  if (req.files && req.files.image && req.files.image[0]) {
    const image_Local_Path = req.files.image[0].path;
    const uploadImage = await uploadToCloudinary(image_Local_Path);
    const q = `UPDATE product SET image =?,updated_at =? WHERE product_id =?;`;
    const result = await executeQuery(q, [
      uploadImage.url,
      new Date(),
      product_id,
    ]);
    if (result.affectedRows !== 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to update product", null));
    }
  }

  // try {
  const updateQuery = `SELECT * FROM product WHERE product_id=?;`;

  const result = await executeQuery(updateQuery, [product_id]);

  res
    .status(200)
    .json(new APiResponse(200, "Product updated successfully", result));
  // } catch (error) {
  res.status(500).json(new APiResponse(500, "Internal Server Error!!!", error));
  // }
});

//code for deleting product
export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { product_id } = req.body;
    const delete_product = `DELETE FROM product WHERE product_id = ?`;
    const result = await executeQuery(delete_product, [product_id]);
    if (result.affectedRows !== 1) {
      return res
        .status(500)
        .json(new APiResponse(500, "Failed to delete product", null));
    }

    return res
      .status(200)
      .json(new APiResponse(200, "Product deleted successfully", null));
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Internal Server Error!!!", error));
  }
});
