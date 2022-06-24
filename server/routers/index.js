import express from "express";
import tweetRouter from "./tweets.js";
import authRouter from "./auth.js";

const router = express.Router();

router.use("/tweets", tweetRouter);
router.use("/auth", authRouter);

export default router;
