import express from "express";
import {
  createTweet,
  deleteTweet,
  editTweet,
  getTweets,
} from "../database/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  if ("username" in req.query) {
    let tweets = await getTweets(req.query.username);
    res.status(200).send(tweets);
  } else {
    let tweets = await getTweets();
    res.status(200).send(tweets);
  }
});

router.post("/", async (req, res) => {
  const { username, name, content, url } = req.body;

  if (username === undefined || name === undefined || content === undefined) {
    return res.status(400).send({ message: "invalid form" });
  }

  let result = await createTweet(username, name, content, url);
  res.status(201).send({ result });
});

router.put("/:id", async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;

  if (content === undefined) {
    return res.status(400).send({ message: "invalid form" });
  }

  try {
    let result = await editTweet(id, content);
    res.status(200).send({ result });
  } catch (err) {
    res.status(400).send({ message: "invalid id" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await deleteTweet(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send({ message: "invalid id" });
  }
});

export default router;
