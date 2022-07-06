import { db } from "../db/database.js";

export async function findByUsername(username) {
  return db
    .execute(`SELECT * from users WHERE username=?`, [username])
    .then((result) => result[0][0]);
}

export async function findById(id) {
  return db
    .execute(`SELECT * from users WHERE id=?`, [id])
    .then((result) => result[0][0]);
}

export async function createUser({ username, password, name, email, url }) {
  return db
    .execute(
      `INSERT INTO users (username, password, name, email, avatar) VALUES (?, ?, ?, ?, ?)`,
      [username, password, name, email, url === undefined ? null : url]
    )
    .then((result) => {
      return result[0].insertId;
    });
}
