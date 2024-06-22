import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  //   getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();
router.use(verifyJwt);

// Create a new product
router.route("/new-product").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  createProduct
);

// Get all products
// router.route("/").get(getProducts);

// Get a single product
router.route("/get-product").get(getProduct);

// Update a product
router.route("/update-product").put(updateProduct);

// Delete a product
router.route("/delete-product").delete(deleteProduct);

export default router;
