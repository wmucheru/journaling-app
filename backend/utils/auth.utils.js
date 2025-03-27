import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { JWT_SECRET, JWT_TOKEN_EXPIRY } from "./constants.js";

/**
 *
 * Hash password input
 *
 */
export const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

/**
 *
 * Compare passwords on login
 *
 */
export const comparePassword = async (password, hashedPassword) =>
  await bcrypt.compareSync(password, hashedPassword);

/**
 *
 * Generate JWT token
 *
 */
export const generateJWTToken = (user) =>
  jwt.sign(user, JWT_SECRET, {
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
      message: "Unauthorized",
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
