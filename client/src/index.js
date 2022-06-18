import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TweetService } from "./services/tweet";
import { AxiosInstance } from "./network/http";

const root = ReactDOM.createRoot(document.getElementById("root"));
const axiosInstacne = new AxiosInstance();
const tweetService = new TweetService(axiosInstacne);

root.render(
  <React.StrictMode>
    <App tweetService={tweetService} />
  </React.StrictMode>
);
