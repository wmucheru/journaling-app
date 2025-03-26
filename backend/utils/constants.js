/**
 *
 * Constants
 *
 */

// App
export const APP_HOST = process.env.HOST || "0.0.0.0";
export const APP_PORT = process.env.PORT || 8000;

// Database
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_NAME = process.env.DB_NAME;

// Auth
export const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_TOKEN_EXPIRY = process.env.JWT_TOKEN_EXPIRY;
