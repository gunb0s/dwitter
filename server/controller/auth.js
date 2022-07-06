import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import * as authRepository from "../db/database.js";

export async function login(req, res) {
  const { username, password } = req.body;

  const user = await authRepository.findByUsername(username);

  if (user === null) {
    return res.status(401).json({ message: "Invalid user or password" });
  } else {
    const ok = await bcrypt.compare(password, user.password);
    if (ok) {
      const token = createJwtToken(user._id);

      return res.status(200).json({ token, username });
    } else {
      return res.status(401).json({ message: "Invalid user or password" });
    }
  }
}

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  let user = await authRepository.findByUsername(username);

  if (user === null) {
    const hash = await bcrypt.hash(password, config.bcrypt.slatRounds);
    const userId = await authRepository.createUser({
      username,
      password: hash,
      name,
      email,
      url,
    });
    const token = createJwtToken(userId);

    return res.status(201).json({ token, username });
  } else {
    return res
      .status(409)
      .json({ message: `username(${username}) already exist` });
  }
}

export async function me(req, res) {
  const user = await authRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}
