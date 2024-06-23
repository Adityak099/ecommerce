import { APiResponse } from "../utils/ApiResponse.js";
import MissingFields from "../utils/MissingFields.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createOrder = asyncHandler(async (req, res) => {
  // order_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
  // user_id BIGINT NOT NULL,
  // item_id INT NOT NULL,
  // payment_id INT DEFAULT NULL,
  // total_amount DECIMAL(10, 2) NOT NULL,
  // status ENUM('PENDING', 'CLOSED') NOT NULL DEFAULT "PENDING",
  // created_at TIMESTAMP NOT NULL,
  // updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  // FOREIGN KEY (user_id) REFERENCES users(user_id),
  // FOREIGN KEY (item_id) REFERENCES order_item(item_id)
  const {
    user_id,
    item_id,
    payment_id,
    total_amount,
    status,
    created_at,
    updated_at,
  } = req.body;
  const missingItems = MissingFields({
    user_id,
    item_id,
    total_amount,
    status,
    created_at,
    updated_at,
  });
  if (Object.keys(missingItems).length > 0) {
    return res
      .status(400)
      .json(new APiResponse(400, "All fields are required", { missingItems }));
  }
  return res
    .status(200)
    .json(new APiResponse(200, "Order created successfully", req.body));
});
export const deleteOrder = asyncHandler(async (req, res) => {});
export const getOrder = asyncHandler(async (req, res) => {});
export const getOrders = asyncHandler(async (req, res) => {});
export const updateOrder = asyncHandler(async (req, res) => {});
