import express from "express";
import * as tweetRepository from "../database/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  if ("username" in req.query) {
    let tweets = await tweetRepository.getAll(req.query.username);
    res.status(200).json({ tweets });
  } else {
    let tweets = await tweetRepository.getAll();
    res.status(200).json({ tweets });
  }
});

router.post("/", async (req, res) => {
  const { username, name, content, url } = req.body;

  if (username === undefined || name === undefined || content === undefined) {
    return res.status(400).send({ message: "invalid form" });
  }

  let tweet = await tweetRepository.create(username, name, content, url);
  res.status(201).json({ tweet });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let tweet = await tweetRepository.getById(id);
    res.status(200).json({ tweet });
  } catch (err) {
    res.status(400).send({ message: `invalid id(${id})` });
  }
});

router.put("/:id", async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;

  if (content === undefined) {
    return res.status(400).send({ message: "invalid form" });
  }

  try {
    let tweet = await tweetRepository.update(id, content);
    res.status(200).json({ tweet });
  } catch (err) {
    res.status(400).send({ message: `invalid id${id}` });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await tweetRepository.remove(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send({ message: `invalid id${id}` });
  }
});

export default router;
