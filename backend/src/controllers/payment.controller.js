import { APiResponse } from "../utils/ApiResponse.js";
import MissingFields from "../utils/MissingFields.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { executeQuery } from "../db/Query.js";

export const createPayment = asyncHandler(async (req, res) => {
  const { order_id, currency, amount, payment_option } = req.body;
  const emptyFields = MissingFields({
    order_id,
    currency,
    amount,
    payment_option,
  });
  if (Object.keys(emptyFields).length > 0) {
    return res
      .status(400)
      .json(new APiResponse(400, "All fields are Required...", emptyFields));
  }
  const q = `
    SELECT 
        COUNT(*) as pending_count
    FROM payments 
    WHERE order_id = ? 
    AND user_id = ? 
    AND status = 'PENDING';
`;

  const doesPaymentExist = await executeQuery(q, [order_id, req.id]);
  if (doesPaymentExist[0].pending_count > 0) {
    return res
      .status(400)
      .json(new APiResponse(400, "Payment for this order is already pending"));
  }
  const query = `INSERT INTO payments(payment_id,order_id, user_id, currency, amount, payment_option, status,created_at,updated_at) VALUES(?, ?, ?, ?, ?, ?,?,?,?)`;

  const result = await executeQuery(query, [
    null,
    order_id,
    req.id,
    currency.toUpperCase(),
    amount,
    payment_option.toLowerCase(),
    "PENDING",
    new Date(),
    new Date(),
  ]);
  if (result.affectedRows === 0) {
    return res.status(400).json(new APiResponse(400, "Payment Failed", result));
  }
  const getpayment = `SELECT * FROM payments WHERE payment_id = ? AND user_id = ?;`;
  const payment = await executeQuery(getpayment, [result.insertId, req.id]);
  if (payment.length === 0) {
    return res
      .status(404)
      .json(new APiResponse(404, "Failed to create payment", payment));
  }
  return res
    .status(200)
    .json(new APiResponse(200, "Payment Created Successfully", payment));
});

export const getPayment = asyncHandler(async (req, res) => {
  const { payment_id } = req.body;
  if (!payment_id) {
    return res.status(400).json(new APiResponse(400, "Payment ID is Required"));
  }
  const query = `SELECT * FROM payments WHERE payment_id = ? AND user_id = ?;`;
  const result = await executeQuery(query, [payment_id, req.id]);
  if (result.length === 0) {
    return res
      .status(404)
      .json(new APiResponse(404, "Payment Not Found", result));
  }
  return res
    .status(200)
    .json(new APiResponse(200, "Payment Fetched Successfully", result));
});

export const updatePayment = asyncHandler(async (req, res) => {
  const { payment_id, status } = req.body;
  if (!payment_id || !status) {
    return res
      .status(400)
      .json(new APiResponse(400, "Payment ID and Status is Required"));
  }
  const query = `UPDATE payments SET status = ?,updated_at=? WHERE payment_id = ? AND user_id = ?;`;
  const result = await executeQuery(query, [
    status,
    new Date(),
    payment_id,
    req.id,
  ]);
  if (result.affectedRows === 0) {
    return res
      .status(400)
      .json(
        new APiResponse(
          400,
          `Payment does not exist for this ${payment_id} payment id `
        )
      );
  }
  const getpayment = `SELECT * FROM payments WHERE payment_id = ? AND user_id = ?;`;
  const payment = await executeQuery(getpayment, [payment_id, req.id]);
  return res
    .status(200)
    .json(new APiResponse(200, "Payment Updated Successfully", payment));
});

export const deletePayment = asyncHandler(async (req, res) => {
  const { payment_id } = req.body;
  if (!payment_id) {
    return res.status(400).json(new APiResponse(400, "Payment ID is Required"));
  }
  const query = `DELETE FROM payments WHERE payment_id = ? AND user_id = ?;`;
  const result = await executeQuery(query, [payment_id, req.id]);
  if (result.affectedRows === 1) {
    return res
      .status(200)
      .json(new APiResponse(200, "Payment Deleted Successfully"));
  }
  if (result.affectedRows === 0) {
    return res
      .status(400)
      .json(
        new APiResponse(
          400,
          `Payment does not exist for payment id ${payment_id} For current user`
        )
      );
  }
});

export const getPayments = asyncHandler(async (req, res) => {
  const query = `SELECT * FROM payments WHERE user_id = ?;`;
  const result = await executeQuery(query, [req.id]);
  if (result.length === 0) {
    return res
      .status(404)
      .json(
        new APiResponse(404, "No Payments Found for the Current User", result)
      );
  }
  return res
    .status(200)
    .json(new APiResponse(200, "Payments Fetched Successfully", result));
});
