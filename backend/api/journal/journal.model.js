import { DataTypes, QueryTypes, Sequelize } from "sequelize";

import { DB } from "../../utils/db.js";

const JournalModel = DB.define(
  "journalEntry",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(192),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deleted: {
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

export const Journal = {};

Journal.getAll = async function () {
  return await DB.query("SELECT * from journalEntries ORDER BY id DESC", {
    type: QueryTypes.SELECT,
  });
};

Journal.getOne = async function (id) {
  return await JournalModel.findOne({ where: { id } });
};

Journal.insert = async function (obj) {
  const insert = await JournalModel.create(obj);
  return Journal.getOne(insert?.id);
};

Journal.update = async function (obj) {
  const { id } = obj;

  await JournalModel.update(obj, { where: { id } });
  return Journal.getOne(id);
};

Journal.deleteOne = async function (id) {
  await JournalModel.destroy({ where: { id } });
  return id;
};
