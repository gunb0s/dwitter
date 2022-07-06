import { getSocketIO } from "../connection/socket.js";
import * as tweetRepository from "../data/tweet.js";

export async function getTweets(req, res) {
  if ("username" in req.query) {
    let tweets = await tweetRepository.getAllByUsername(req.query.username);
    res.status(200).json(tweets);
  } else {
    let tweets = await tweetRepository.getAll();
    res.status(200).json(tweets);
  }
}

export async function createTweets(req, res) {
  const { content } = req.body;

  let tweet = await tweetRepository.create(content, req.userId);
  res.status(201).json(tweet);
  getSocketIO().emit("tweets", tweet);
}

export async function getTweetById(req, res) {
  const { id } = req.params;

  try {
    let tweet = await tweetRepository.getById(id);
    res.status(200).json(tweet);
  } catch (err) {
    res.status(400).json({ message: `invalid id(${id})` });
  }
}

export async function updateTweet(req, res) {
  const { content } = req.body;
  const { id } = req.params;
  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.sendStatus(404);
  }

  if (tweet.userId !== Number(req.userId)) {
    return res.sendStatus(403);
  }

  let updated = await tweetRepository.update(content, id);
  res.status(200).json(updated);
}

export async function removeTweet(req, res) {
  const { id } = req.params;

  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== Number(req.userId)) {
    return res.sendStatus(403);
  }

  await tweetRepository.remove(id);
  res.sendStatus(204);
}
