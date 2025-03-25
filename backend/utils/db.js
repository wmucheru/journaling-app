/**
 *
 * Database Utils
 *
 */
import { Sequelize as SQ } from "sequelize";

import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "./constants.js";

const connection = new SQ(
  `mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);

try {
  await connection.authenticate();
} catch (e) {
  console.log("DB_ERROR: ", e);
}

export const DB = connection;
