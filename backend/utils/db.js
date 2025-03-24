/**
 *
 * Database Utils
 *
 */
import { Sequelize } from "sequelize";
import { DB_HOST, DB_PASS, DB_PORT, DB_USER } from "./constants.js";

export const DB = {
  init: async () => {
    const sequelize = new Sequelize(
      `mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`
    );

    try {
      await sequelize.authenticate();
      return sequelize;
    } catch (e) {
      console.log("DB_ERROR: ", e);
      return {};
    }
  },
};
