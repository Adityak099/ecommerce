import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createDiscount,
  getDiscounts,
  getDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscountsForProduct,
} from "../controllers/discounts.controller.js";

const router = Router();
router.use(verifyJwt);

// Create a new discount✅
router.route("/new-discount").post(createDiscount);

// Get all discounts✅
router.route("/get-discounts").get(getDiscounts);

// Get a discount by id✅
router.route("/get-discount").get(getDiscount);

// Update a discount by id✅
router.route("/update-discount").patch(updateDiscount);

// Delete a discount by id✅
router.route("/delete-discount").delete(deleteDiscount);

//Get all discounts for particular product:
// router.route("/get-all-discounts-for-product").get(getDiscountsForProduct);

export default router;
