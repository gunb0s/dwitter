import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./auth.js";

const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Tweet = sequelize.define("tweet", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Tweet.belongsTo(User);

const INCLUDE_USER = {
  attributes: [
    "id",
    "content",
    "createdAt",
    "userId",
    [Sequelize.col("user.name"), "name"],
    [Sequelize.col("user.username"), "username"],
    [Sequelize.col("user.avatar"), "avatar"],
  ],
  include: {
    model: User,
    attributes: [],
  },
  order: [["createdAt", "DESC"]],
};

const ORDER_DESC = { order: [["createdAt", "DESC"]] };

export async function getAll() {
  return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
}

export async function getAllByUsername(username) {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include,
      where: { username },
    },
  });
}

export async function getById(id) {
  return Tweet.findOne({
    where: { id },
    ...INCLUDE_USER,
  });
}

export async function create(content, userId) {
  return Tweet.create({ content, userId }).then((data) =>
    getById(data.dataValues.id)
  );
}

export async function update(id, content) {
  return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
    tweet.content = content;
    return tweet.save();
  });
}

export async function remove(id) {
  return Tweet.findByPk(id).then((tweet) => tweet.destroy());
}
