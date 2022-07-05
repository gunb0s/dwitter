import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import indexRouter from "./routers/index.js";
import { connectDB } from "./database/database.js";
import { config } from "./config.js";
import { Server } from "socket.io";
import { initSocket } from "./connection/socket.js";

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use("/", indexRouter);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB()
  .then(() => {
    const server = app.listen(config.host.port);
    initSocket(server);
  })
  .catch(console.error);
