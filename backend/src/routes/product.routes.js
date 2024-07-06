import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createProduct,
  getProductId,
  getProductsByCategoryId,
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

// Create a new product✅
router.route("/new-product").post(verifyJwt,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  createProduct
);

// Get a single product by id✅
router.route("/get-product-id").get(getProductId);

//Get product by category Id✅
router.route("/get-product-by-category-id").get(getProductsByCategoryId);

// Get all products✅
router.route("/get-all-product").get(getAllProducts);

// Update a product✅
router.route("/update-product").patch(verifyJwt,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  updateProduct
);

// Delete a product
router.route("/delete-product").delete(verifyJwt,deleteProduct);

export default router;
