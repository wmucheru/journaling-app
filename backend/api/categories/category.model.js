import { DataTypes, QueryTypes, Sequelize } from "sequelize";

import { DB } from "../../utils/db.js";

const CategoryModel = DB.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(192),
      allowNull: false,
    },
    active: {
      type: DataTypes.ENUM("1", "0"),
      defaultValue: "1",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false,
  }
);

export const Category = {};

Category.getAll = async function () {
  return await DB.query("SELECT * from categories ORDER BY name DESC", {
    type: QueryTypes.SELECT,
  });
};

Category.getOne = async function (id) {
  return await DB.query(`SELECT * from categories WHERE id=${id}`, {
    type: QueryTypes.SELECT,
  });
};

Category.insert = async function (obj) {
  return await CategoryModel.create(obj);
};
