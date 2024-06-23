import { executeQuery } from "../db/Query.js";
import {
  deleteAddressQuery,
  newAddressQuery,
} from "../models/address.query.js";
import { APiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const newAddress = asyncHandler(async (req, res) => {
  try {
    const { address_line1, address_line2, city, state, country, postal_code } =
      req.body;

    const requiredFields = {
      address_line1,
      address_line2,
      city,
      state,
      country,
      postal_code,
    };
    const missingFields = {};
    Object.entries(requiredFields).forEach(([key, value]) => {
      if (!value) {
        missingFields[key] = `${key} is required`;
      }
    });

    if (Object.keys(missingFields).length > 0) {
      return res
        .status(400)
        .json(
          new APiResponse(400, "All fields are required", { missingFields })
        );
    }
    const isUserAddressExisting = await executeQuery(
      `SELECT * FROM address WHERE user_id = ?`,
      [req.id]
    );

    if (isUserAddressExisting.length > 0) {
      return res
        .status(400)
        .json(
          new APiResponse(
            400,
            "User address already exists",
            isUserAddressExisting[0]
          )
        );
    }

    const result = await executeQuery(newAddressQuery, [
      null,
      req.id,
      address_line1,
      address_line2,
      city,
      state,
      country,
      postal_code,
      new Date(),
      new Date(),
    ]);

    const newAddress = await executeQuery(
      `SELECT * FROM address WHERE address_id = ?`,
      [result.insertId]
    );

    return res
      .status(201)
      .json(new APiResponse(201, "Address created", newAddress[0]));
  } catch (error) {
    return res.status(500).json(new APiResponse(500, "Internal server error"));
  }
});

export const deleteAddress = asyncHandler(async (req, res) => {
  try {
    const { address_id } = req.body;
    if (!address_id) {
      return res
        .status(400)
        .json(new APiResponse(400, "Address id is required"));
    }
    const result = await executeQuery(deleteAddressQuery, [address_id]);
    if (result.affectedRows !== 1) {
      return res
        .status(400)
        .json(new APiResponse(400, "Failed to delete address"));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "Address deleted successfully"));
  } catch (error) {
    return res.status(500).json(new APiResponse(500, "Internal server error"));
  }
});
export const updateAddress = asyncHandler(async (req, res) => {
  try {
    const { address_line1, address_line2, city, state, country, postal_code } =
      req.body;
    //warning: High level code below handle with care
    const fieldsToUpdate = {};
    if (address_line1) fieldsToUpdate.address_line1 = address_line1;
    if (address_line2) fieldsToUpdate.address_line2 = address_line2;
    if (city) fieldsToUpdate.city = city;
    if (state) fieldsToUpdate.state = state;
    if (country) fieldsToUpdate.country = country;
    if (postal_code) fieldsToUpdate.postal_code = postal_code;

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json(new APiResponse(400, "No fields to update"));
    }

    let updateQuery = "UPDATE address SET ";
    const updateValues = [];
    for (const [key, value] of Object.entries(fieldsToUpdate)) {
      updateQuery += `${key} = ?, `;
      updateValues.push(value);
    }
    updateQuery += "updated_at = ? WHERE user_id = ?";
    updateValues.push(new Date(), req.id);

    await executeQuery(updateQuery, updateValues);

    const updatedAddress = await executeQuery(
      `SELECT * FROM address WHERE user_id = ?`,
      [req.id]
    );
    return res
      .status(200)
      .json(
        new APiResponse(200, "Address updated successfully", updatedAddress[0])
      );
  } catch (error) {
    return res.status(500).json(new APiResponse(500, "Internal server error"));
  }
});

export const getAddresses = asyncHandler(async (req, res) => {
  try {
    const addresses = await executeQuery(
      `SELECT * FROM address WHERE user_id = ?`,
      [req.id]
    );
    return res
      .status(200)
      .json(new APiResponse(200, "Addresses retrieved", addresses));
  } catch (error) {
    return res.status(500).json(new APiResponse(500, "Internal server error"));
  }
});

export const getAddressById = asyncHandler(async (req, res) => {
  try {
    const { address_id } = req.body;
    if (!address_id) {
      return res
        .status(400)
        .json(new APiResponse(400, "Address id is required"));
    }
    const address = await executeQuery(
      `SELECT * FROM address WHERE address_id = ? AND user_id = ?;`,
      [address_id, req.id]
    );
    if (address.length === 0) {
      return res.status(404).json(new APiResponse(404, "Address not found"));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "Address retrieved", address[0]));
  } catch (error) {
    return res.status(500).json(new APiResponse(500, "Internal server error"));
  }
});
