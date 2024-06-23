import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { APiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { executeQuery } from "../../src/db/Query.js";
import { getUserInfo, insertUser } from "../models/queries.model.js";
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
    const { first_name, last_name, email, username, phone, password } =
      req.body;

    if (!email) {
      return res
        .status(400)
        .json(new APiResponse(400, { email: "Email is required" }, null));
    } else if (email.indexOf("@") === -1) {
    }
    if (!username) {
      return res
        .status(400)
        .json(new APiResponse(400, { username: "Username is required" }, null));
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
        .json(
          new APiResponse(400, { first_name: "First name is required" }, null)
        );
    }
    if (!last_name) {
      return res
        .status(400)
        .json(
          new APiResponse(400, { last_name: "Last name is required" }, null)
        );
    }
    if (!password) {
      return res
        .status(400)
        .json(new APiResponse(400, { password: "Password is required" }, null));
    }

    if (!req.files?.avatar) {
      return res
        .status(400)
        .json(
          new APiResponse(400, { avatar: "Avatar file is required" }, null)
        );
    }
    if (!phone) {
      return res
        .status(400)
        .json(
          new APiResponse(400, { phone: "Phone number is required" }, null)
        );
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
        .json(
          new APiResponse(
            400,
            { coverImage: "Cover Image file is required" },
            null
          )
        );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = await uploadToCloudinary(avatarLocalPath);
    const coverImage = await uploadToCloudinary(coverImageLocalPath);

    const insertedUser = await executeQuery(insertUser, [
      null,
      first_name,
      last_name,
      username,
      email,
      phone,
      hashedPassword,
      null,
      avatar.url,
      coverImage.url,
      new Date(),
      new Date(),
    ]);
    const user_id = insertedUser.insertId;
    req.id = user_id;

    const userDetails = await executeQuery(getUserInfo, [user_id]);
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
  try {
    const { username, email, password } = req.body;
    if (!(username || email)) {
      return res.status(400).json({
        status: 400,
        message: "Username or email is required",
        data: null,
      });
    }
    const userQuery = `
        SELECT user_id, username, password, email
        FROM users
        WHERE username = ? 
      `;
    const userParams = [username];
    const [userData] = await executeQuery(userQuery, userParams);
    if (!userData) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        data: { username },
      });
    }
    if (!password) {
      return res.status(400).json({
        status: 400,
        message: "Password is required",
        data: null,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        message: "Invalid password",
        data: null,
      });
    }

    const access_token = generateAccessToken(userData.user_id);
    const refresh_token = generateRefreshToken(userData.user_id);
    const q = `UPDATE users SET refresh_token = ? , updated_at = ? WHERE user_id = ?;`;
    const p = [refresh_token, new Date(), userData.user_id];
    await executeQuery(q, p);
    return res
      .status(200)
      .cookie("refresh_token", refresh_token, {
        ...options,
        maxAge: 14 * 24 * 60 * 60 * 1000,
      })
      .cookie("access_token", access_token, {
        ...options,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json(
        new APiResponse(200, "User Logged In Successfully", {
          access_token,
          refresh_token,
        })
      );
  } catch (error) {
    return res
      .status(500)
      .json(new APiResponse(500, "Internal Server Error", error));
  }
});

export const logOutUser = asyncHandler(async (req, res) => {
  try {
    const updateRefreshTokenQuery = `
      UPDATE users
      SET refresh_token = NULL
      WHERE user_id = ?
    `;
    const updateRefreshToken = [req.id];
    await executeQuery(updateRefreshTokenQuery, updateRefreshToken);

    return res
      .status(200)
      .clearCookie("refresh_token")
      .clearCookie("access_token")
      .json(new APiResponse(200, "User Logged Out Successfully"));
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export const getUser = asyncHandler(async (req, res) => {
  try {
    const params = [req.body.user_id];
    const [user] = await executeQuery(getUserInfo, params);
    if (!user) {
      return res.status(404).json(new APiResponse(404, "User not found", null));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "Fetched Users successfully", user));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, null, "Something went wrong", error));
  }
});

export const updateUserDetails = asyncHandler(async (req, res) => {
  // try {
  const { first_name, last_name, email, phone } = req.body;
  let response = {};
  if (first_name) {
    const query = `UPDATE users SET first_name = ? , updated_at=? WHERE user_id = ?;`;
    const params = [first_name,new Date(), req.id];
    await executeQuery(query, params);
    response.first_name = "First Name updated successfully";
  }
  if (last_name) {
    const query = `UPDATE users SET last_name = ? , updated_at=? WHERE user_id = ?;`;
    const params = [last_name,new Date(),req.id];
    await executeQuery(query,new Date(), params);
    response.last_name = "Last Name updated successfully";
  }
  if (email) {
    const query = `UPDATE users SET email = ? , updated_at=? WHERE user_id = ?;`;
    const params = [email,new Date(), req.id];
    await executeQuery(query, params);
    response.email = "Email updated successfully";
  }
  if (phone) {
    const query = `UPDATE users SET phone = ? , updated_at=? WHERE user_id = ?;`;
    const params = [phone,new Date(), req.id];
    await executeQuery(query, params);
    response.phone = "Phone updated successfully";
  }

  const query = `SELECT first_name,last_name,email,avatar created_at,updated_at FROM users WHERE user_id = ?;`;
  const [user] = await executeQuery(query, [req.id]);
  return res.status(200).json(
    new APiResponse(200, "User updated successfully", {
      ...user,
      updated_fields: response,
    })
  );
  // } catch (error) {
  return res
    .status(500)
    .json(new APiResponse(500, "Internal Server Error", error));
  // }
});
