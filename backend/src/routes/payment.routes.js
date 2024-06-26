import {
  createPayment,
  deletePayment,
  getPayment,
  updatePayment,
  getPayments,
} from "../controllers/payment.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();
router.use(verifyJwt);

router.route("/create-payment").post(createPayment);
router.route("/update-payment").patch(updatePayment);
router.route("/get-payment").get(getPayment);
router.route("/delete-payment").delete(deletePayment);
router.route("/get-payments").get(getPayments);

export default router;
