import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  BCRYPT_SALT_ROUNDS,
  JWT_SECRET,
  JWT_TOKEN_EXPIRY,
} from "./constants.js";

/**
 *
 * Hash password input
 *
 */
export const hashPassword = async (password) =>
  await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

/**
 *
 * Compare passwords on login
 *
 */
export const comparePassword = async (password, hashedPassword) =>
  await bcrypt.compare(password, hashedPassword);

/**
 *
 * Generate JWT token
 *
 */
export const generateJWTToken = (user) =>
  jwt.sign(user, JWT_SECRET, {
    algorithm: "RS256",
    expiresIn: JWT_TOKEN_EXPIRY,
  });

/**
 *
 * Authentication middleware to verify JWT Token
 *
 */
export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("TOKEN: ", token);

  if (!token) {
    return res.status(401).json({
      error: true,
      message: "User not authorized",
    });
  }

  try {
    const tokenStr = token.replace("Bearer ", "");
    req.user = jwt.verify(tokenStr, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: "Could not verify user",
    });
  }
};
