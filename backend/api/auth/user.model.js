import { DataTypes, QueryTypes, Sequelize } from "sequelize";

import { DB } from "../../utils/db.js";
import { comparePassword } from "../../utils/auth.utils.js";

const UserModel = DB.define(
  "user",
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
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(16),
    },
    password: {
      type: DataTypes.STRING(96),
      allowNull: false,
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

export const User = {};

const attributes = ["name", "email", "createdAt"];

User.getAll = async function () {
  return await UserModel.findAll({
    attributes,
    order: [["id", "DESC"]],
    raw: true,
  });
};

User.getOneById = async function (id) {
  return await UserModel.findOne({
    where: { id },
    raw: true,
  });
};

User.getOneByEmail = async function (email) {
  return await UserModel.findOne({
    where: { email },
    raw: true,
  });
};

User.loginUser = async function (email, password) {
  const user = await UserModel.findOne({
    attributes: ["password"],
    where: {
      email,
    },
    raw: true,
  });

  return (await comparePassword(password, user?.password))
    ? await User.getOneByEmail(email)
    : false;
};

User.insert = async function (obj) {
  const insert = await UserModel.create(obj);
  return User.getOneById(insert?.id);
};

User.update = async function (obj) {
  const { id } = obj;

  await UserModel.update(obj, { where: { id } });
  return User.getOneById(id);
};

User.deleteOne = async function (id) {
  await UserModel.destroy({ where: { id } });
  return id;
};
