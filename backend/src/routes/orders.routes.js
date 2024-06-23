import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/orders.controllers.js";
const router = Router();

router.use(verifyJwt);

router.route("/create-order").post(createOrder);
router.route("/delete-order").delete(deleteOrder);
router.route("/get-order").get(getOrder);
router.route("/get-orders").get(getOrders);
router.route("/update-order").put(updateOrder);

export default router;
