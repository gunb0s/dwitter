import express from "express";
import { body } from "express-validator";
import * as tweetController from "../controller/tweet.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

// Contract Testing: Client-Server
// Proto-Basing

const router = express.Router();

const validateTweet = body("content")
  .trim()
  .isLength({ min: 3 })
  .withMessage("text should be at least 3 characters");

router.get("/", tweetController.getTweets);

router.post(
  "/",
  isAuth,
  [validateTweet, validate],
  tweetController.createTweets
);

router.get("/:id", tweetController.getTweetById);

router.put(
  "/:id",
  isAuth,
  [validateTweet, validate],
  tweetController.updateTweet
);

router.delete("/:id", isAuth, tweetController.removeTweet);

export default router;
