import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  deleteSubCategory,
  newSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
} from "../controllers/sub_category.controller.js";
const router = Router();
router.use(verifyJwt);

router.route("/new-sub-category").post(newSubCategory);
router.route("/delete-sub-category").delete(deleteSubCategory);
router.route("/all-sub-category").get(getAllSubCategories);
router.route("/sub-category-by-id").get(getSubCategoryById);
router.route("/update-sub-category").patch(updateSubCategory);

export default router;
