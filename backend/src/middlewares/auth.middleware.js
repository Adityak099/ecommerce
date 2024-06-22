import { executeQuery } from "../db/Query.js";
import { ApiError } from "../utils/ApiError.js";
import { APiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Jwt from "jsonwebtoken";
export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.access_token ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json(new APiResponse(401, "Unauthorized request"));
    }
    const decodedToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const q = `SELECT * FROM users WHERE user_id = ?`;
    const params = [decodedToken.id];
    const user = await executeQuery(q, params);
    if (!user) {
      return res.status(401).json(new APiResponse(401, "User not found"));
    }

    req.id = decodedToken.id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, error?.message || "Invalid access token"));
  }
});
