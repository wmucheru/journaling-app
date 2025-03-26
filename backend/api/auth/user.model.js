import { DataTypes, QueryTypes, Sequelize } from "sequelize";

import { DB } from "../../utils/db.js";

const UserModel = DB.define(
  "user",
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

User.getAll = async function () {
  return await DB.query(
    `SELECT * 
    FROM users
    ORDER BY id DESC`,
    {
      type: QueryTypes.SELECT,
    }
  );
};

User.getOneById = async function (id) {
  return await UserModel.findOne({ where: { id } });
};

User.getOneByEmail = async function (email) {
  return await UserModel.findOne({ where: { email } });
};

User.loginUser = async function (email, password) {
  return await UserModel.findOne({ where: { email, password } });
};

User.insert = async function (obj) {
  const insert = await UserModel.create(obj);
  return User.getOne(insert?.id);
};

User.update = async function (obj) {
  const { id } = obj;

  await UserModel.update(obj, { where: { id } });
  return User.getOne(id);
};

User.deleteOne = async function (id) {
  await UserModel.destroy({ where: { id } });
  return id;
};
