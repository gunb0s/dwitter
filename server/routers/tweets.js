import express from "express";
import { body, validationResult } from "express-validator";
import * as tweetController from "../controller/tweet.js";

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

router.get("/", tweetController.getTweets);

router.post(
  "/",
  [
    body("username").trim().notEmpty(),
    body("name").trim().notEmpty(),
    body("content").trim().notEmpty(),
    validate,
  ],
  tweetController.createTweets
);

router.get("/:id", tweetController.getTweet);

router.put("/:id", tweetController.updateTweet);

router.delete("/:id", tweetController.removeTweet);

export default router;
