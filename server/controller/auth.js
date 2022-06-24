import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authRepository from "../database/database.js";

// MakeItSecure
const jwtExpiresInDays = "2d";
const bcryptSoltRounds = 12;

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
    const hash = await bcrypt.hash(password, bcryptSoltRounds);

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
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const username = req.body.username;

  if (token) {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (payload.username === username) {
      return res.sendStatus(200);
    } else {
      return res.status(400).json({ message: "Invalid token" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Token is not included in the header" });
  }
}

function createJwtToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: jwtExpiresInDays,
  });
}
