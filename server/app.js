import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { connectDB } from "./database/database.js";

const PORT = 8080;

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

connectDB()
  .then((db) => {
    console.log("init!", db);
    const server = app.listen(PORT);
  })
  .catch(console.error);
