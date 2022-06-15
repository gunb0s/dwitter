import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { tweetRouter } from "./routers/index.js";
import { connectDB } from "./database/database.js";

const PORT = 8080;

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use("/tweets", tweetRouter);

connectDB()
  .then(() => {
    const server = app.listen(PORT);
  })
  .catch(console.error);
