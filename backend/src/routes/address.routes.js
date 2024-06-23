import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  deleteAddress,
  getAddressById,
  getAddresses,
  newAddress,
  updateAddress,
} from "../controllers/address.controller.js";
const router = Router();

router.use(verifyJwt);

router.route("/new-address").post(newAddress);
router.route("/delete-address").post(deleteAddress);
router.route("/update-address").post(updateAddress);
router.route("/get-address").get(getAddresses);
router.route("/get-address-by-id").get(getAddressById);

export default router;
