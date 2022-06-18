import express from "express";
import * as tweetController from "../controller/tweet.js";

const router = express.Router();

router.get("/", tweetController.getTweets);

router.post("/", tweetController.createTweets);

router.get("/:id", tweetController.getTweet);

router.put("/:id", tweetController.updateTweet);

router.delete("/:id", tweetController.removeTweet);

export default router;
