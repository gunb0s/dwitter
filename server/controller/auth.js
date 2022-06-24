import * as authRepository from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);
  const user = await authRepository.findUser(username, hash);

  if (user === null) {
    return res.status(400).json({ message: "it doesn't exist" });
  } else {
    const encrypted = user.password;
    const ok = await bcrypt.compare(password, encrypted);
    if (ok) {
      const token = jwt.sign(
        {
          id: username,
          isAdmin: false,
        },
        process.env.JWT_SECRET
      );

      return res.status(200).json({ token, user });
    } else {
      return res.status(400).json({ message: "password is not correct" });
    }
  }
}

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
}

export async function me(req, res) {}
