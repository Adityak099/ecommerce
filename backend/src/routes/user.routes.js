import { Router } from "express";
import {
  getUser,
  loginUser,
  logOutUser,
  refreshToken,
  registerUser,
  updateUserDetails,
  verifyUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);
router.route("/user-info").get(verifyJwt, getUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logOutUser);
router.route("/delete-user").post(verifyJwt, logOutUser);
router.route("/refresh-access-token").post(refreshToken);
router.route("/verify-access-token").post(verifyUser);
router.route("/update-user-details").post(verifyJwt, updateUserDetails);

export default router;
