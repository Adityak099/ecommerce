import { Router } from "express";
import { createNewCategory } from "../controllers/category.controller.js";

const router = Router();

router.route("/new-category").post(createNewCategory);

export default router;
