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
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
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
  return await DB.query("SELECT * from categories ORDER BY name ASC", {
    type: QueryTypes.SELECT,
  });
};

Category.getAllByUser = async function (userId) {
  return await DB.query(
    `SELECT *
    FROM categories
    WHERE userId=${userId}
    ORDER BY name ASC`,
    {
      type: QueryTypes.SELECT,
    }
  );
};

Category.getOne = async function (id) {
  return await CategoryModel.findOne({ where: { id } });
};

Category.insert = async function (obj) {
  const insert = await CategoryModel.create(obj);
  return Category.getOne(insert?.id);
};

Category.update = async function (obj) {
  const { id } = obj;

  await CategoryModel.update(obj, { where: { id } });
  return Category.getOne(id);
};

Category.deleteOne = async function (id) {
  await CategoryModel.destroy(id);
  return id;
};
