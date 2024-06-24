import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createInventory,
  deleteInventory,
  getInventory,
  getInventoryById,
  updateInventory,
} from "../controllers/inventory.controller.js";

const router = Router();

router.use(verifyJwt);

router.route("/create-inventory").post(createInventory);

router.route("/get-inventories").get(getInventory);

router.route("/update-inventory").patch(updateInventory);

router.route("/get-inventory").get(getInventoryById);

router.route("/delete-inventory").delete(deleteInventory);

export default router;
