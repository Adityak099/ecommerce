import { Router } from "express";
import * as order_itemsController from "../controllers/order_items.controller,s";
import { verifyJwt } from "../middlewares/auth.middleware";

const router = Router();

//Create a new order item
router.post("/new-order", order_itemsController.createOrderItem);

//Get all order items
router.get("/", order_itemsController.getAllOrderItems);

//Get order item by ID
router.get("/:id", order_itemsController.getOrderItemById);

//Update a order item
router.put("/:id", order_itemsController.updateOrderItem);

//Delete a order item
router.delete("/:id", order_itemsController.deleteOrderItem);

export default router;  

// const router = Router();

// // GET all order_items
// router.get("/", (req, res) => {
//   // Your code here
// });

// // GET a specific order_item by ID
// router.get("/:id", (req, res) => {
//   // Your code here
// });

// // POST a new order_item
// router.post("/", (req, res) => {
//   // Your code here
// });

// // PUT/update a specific order_item by ID
// router.put("/:id", (req, res) => {
//   // Your code here
// });

// // DELETE a specific order_item by ID
// router.delete("/:id", (req, res) => {
//   // Your code here
// });

// module.exports = router;
