import { Router } from "express";
import {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
} from "../controllers/orderItem.controller.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJwt);

//Create a new order item
router.post("/new-order-item", createOrderItem);


//Update a order item
router.patch("/update-order-item", updateOrderItem);

//Delete a order item
router.delete("/delete-order-item", deleteOrderItem);

//Get all order items
router.get("/get-order-items", getAllOrderItems);

//Get order item by ID
router.get("/get-order-item", getOrderItemById);

export default router;

