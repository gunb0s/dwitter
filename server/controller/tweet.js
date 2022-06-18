import * as tweetRepository from "../database/database.js";

export async function getTweets(req, res) {
  if ("username" in req.query) {
    let tweets = await tweetRepository.getAll(req.query.username);
    res.status(200).json({ tweets });
  } else {
    let tweets = await tweetRepository.getAll();
    res.status(200).json({ tweets });
  }
}

export async function createTweets(req, res) {
  const { username, name, content, url } = req.body;

  if (username === undefined || name === undefined || content === undefined) {
    return res.status(400).send({ message: "invalid form" });
  }

  let tweet = await tweetRepository.create(username, name, content, url);
  res.status(201).json({ tweet });
}

export async function getTweet(req, res) {
  const { id } = req.params;

  try {
    let tweet = await tweetRepository.getById(id);
    res.status(200).json({ tweet });
  } catch (err) {
    res.status(400).json({ message: `invalid id(${id})` });
  }
}

export async function updateTweet(req, res) {
  const { content } = req.body;
  const { id } = req.params;

  if (content === undefined) {
    return res.status(400).send({ message: "invalid form" });
  }

  try {
    let tweet = await tweetRepository.update(id, content);
    res.status(200).json({ tweet });
  } catch (err) {
    res.status(400).json({ message: `invalid id(${id})` });
  }
}

export async function removeTweet(req, res) {
  const { id } = req.params;

  try {
    await tweetRepository.remove(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ message: `invalid id(${id})` });
  }
}
