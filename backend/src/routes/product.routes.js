import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
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
router.route("/new-product").post(createProduct);

// Get all products
// router.route("/").get(getProducts);

// Get a single product
router.route("/:id").get(getProduct);

// Update a product
router.route("/:id").put(updateProduct);

// Delete a product
router.route("/:id").delete(deleteProduct);

export default router;
