import { db } from "../db/database.js";

const SELECT_JOIN = `SELECT tw.id, tw.content, tw.createdAt, tw.userId, us.username, us.name, us.avatar FROM tweets as tw JOIN users as us ON tw.userId = us.id `;

const ORDER_DESC = `ORDER BY tw.createdAt DESC`;

export async function getAll() {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username = ? ${ORDER_DESC}`, [username])
    .then((result) => result[0]);
}

export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
    .then((result) => result[0][0]);
}

export async function create(content, userId) {
  return db
    .execute(
      `INSERT INTO tweets (content, userId, createdAt) VALUES (?, ?, ?)`,
      [content, userId, new Date()]
    )
    .then((result) => getById(result[0].insertId));
}

export async function update(content, id) {
  return db
    .execute(`UPDATE tweets SET content=? WHERE id=?`, [content, id])
    .then(() => getById(id));
}

export async function remove(id) {
  return db.execute("DELETE from tweets WHERE id=?", [id]);
}
