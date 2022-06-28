import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { TweetService } from "./services/tweet";
import { AxiosInstance } from "./network/http";
import { AuthErrorEventBus, AuthProvider } from "./context/AuthContext";

const baseURL = process.env.REACT_APP_SERVER_URL;
const authErrorEventBus = new AuthErrorEventBus();
const axiosInstacne = new AxiosInstance();
const tweetService = new TweetService(axiosInstacne);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider authErrorEventBus={authErrorEventBus}>
        <App tweetService={tweetService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
