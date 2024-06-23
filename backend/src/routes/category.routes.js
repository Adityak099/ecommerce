import { Router } from "express";
import {
  createNewCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  getCategoryById,
} from "../controllers/category.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJwt);

router.route("/new-category").post(createNewCategory);
router.route("/delete-category").post(deleteCategory);
router.route("/get-all-category").get(getAllCategories);
router.route("/delete-category").delete(deleteCategory);
router.route("/update-category").patch(updateCategory);
router.route("/get-category-by-id").post(getCategoryById);

export default router;
