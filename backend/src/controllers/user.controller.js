import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
// import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { APiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { executeQuery } from "../../src/db/Query.js";
const options = {
  httpOnly: true,
  secure: true,
};
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "14d",
  });
};
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { first_name, last_name, email, username, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json(new APiResponse(400, "Email is required", null));
    } else if (email.indexOf("@") === -1) {
    }
    if (!username) {
      return res
        .status(400)
        .json(new APiResponse(400, "Username is required", null));
    }
    const q = `SELECT user_id FROM users WHERE username = ?
       OR email = ?;
    `;

    const params = [username, email];
    const s = await executeQuery(q, params);
    if (s.length !== 0) {
      return res
        .status(409)
        .json(
          new APiResponse(
            409,
            `User with username ${username} or email ${email} already exists`,
            null
          )
        );
    }
    if (!first_name) {
      return res
        .status(400)
        .json(new APiResponse(400, "First name is required", null));
    }
    if (!last_name) {
      return res
        .status(400)
        .json(new APiResponse(400, "Last name is required", null));
    }
    if (!password) {
      return res
        .status(400)
        .json(new APiResponse(400, "Password is required", null));
    }

    if (!req.files?.avatar) {
      return res
        .status(400)
        .json(new APiResponse(400, "Avatar file is required", null));
    }
    let coverImageLocalPath;
    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (
      req.files &&
      Array.isArray(req.files.coverImage) &&
      req.files.coverImage.length > 0
    ) {
      coverImageLocalPath = req.files.coverImage[0].path;
    } else {
      return res
        .status(400)
        .json(new APiResponse(400, "Cover Image file is required", null));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatar = await uploadToCloudinary(avatarLocalPath);
    const coverImage = await uploadToCloudinary(coverImageLocalPath);

    const insertQuery = `
    INSERT INTO users (user_id, first_name, last_name, username, email, password, refresh_token, avatar, cover_image, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
    const userQuery = `SELECT user_id, first_name, last_name, username, email, avatar, cover_image, created_at, updated_at ,refresh_token
    FROM users 
    WHERE user_id = ?;`;

    const insertedUser = await executeQuery(insertQuery, [
      null,
      first_name,
      last_name,
      username,
      email,
      hashedPassword,
      "",
      avatar.url,
      coverImage.url,
      new Date(),
      new Date(),
    ]);
    const user_id = insertedUser.insertId;
    req.id = user_id;

    const userDetails = await executeQuery(userQuery, [user_id]);
    return res
      .status(201)
      .json(
        new APiResponse(201, "User registered successfully", userDetails[0])
      );
  } catch (error) {
    if (error instanceof APiResponse) {
      return res.status(500).json(error);
    }
    return res
      .status(500)
      .json(new APiResponse(500, "Internal Server Error!!!", error));
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate input
    if (!(username || email)) {
      return res.status(400).json({
        status: 400,
        message: "Username or email is required",
        data: null,
      });
    }

    // Check if user exists
    const userQuery = `
      SELECT username, password, email, refresh_token
      FROM users
      WHERE username = ? 
    `;
    const userParams = [username];
    const [userData] = await executeQuery(userQuery, userParams);

    if (!userData) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        data: null,
      });
    }

    // User found, return user data
    return res.status(200).json({
      status: 200,
      message: "User found",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  try {
    // Get the user's refresh token from the request
    const refreshToken = req.cookies.refreshToken;

    // If no refresh token is provided, return an error
    if (!refreshToken) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
        data: null,
      });
    }

    // Delete the user's refresh token from the database
    const deleteQuery = `
      UPDATE users
      SET refresh_token = NULL
      WHERE refresh_token =?
    `;
    const deleteParams = [refreshToken];
    await executeQuery(deleteQuery, deleteParams);

    // Clear the refresh token cookie
    res.clearCookie("refreshToken");

    // Return a success response
    return res.status(200).json({
      status: 200,
      message: "User logged out successfully",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export const getUser = asyncHandler(async (req, res) => {
  // try {
  const query = `SELECT * FROM users WHERE user_id = ?;`;
  // const query = `SELECT * FROM  users;`;
  const params = [req.body.user_id];
  const user = await executeQuery(query, params);
  return res
    .status(200)
    .json(new APiResponse(200, "Fetched Users successfully", user));
  // } catch (error) {
  return res
    .status(500)
    .json(new ApiError(500, null, "Something went wrong", error));
  // }
});
