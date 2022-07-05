import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AxiosInstance } from "./network/http";
import { AuthErrorEventBus, AuthProvider } from "./context/AuthContext";
import TweetService from "./services/tweet";
import AuthService from "./services/auth";
import TokenStorage from "./db/token";
import Socket from "./network/socket";

const baseURL = process.env.REACT_APP_SERVER_URL;
const authErrorEventBus = new AuthErrorEventBus();
const tokenStorage = new TokenStorage();
const axiosInstance = new AxiosInstance(baseURL, authErrorEventBus);
const socketClient = new Socket(baseURL, () => tokenStorage.getToken());
const tweetService = new TweetService(
  axiosInstance,
  tokenStorage,
  socketClient
);
const authService = new AuthService(axiosInstance, tokenStorage);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authErrorEventBus={authErrorEventBus}
        authService={authService}
      >
        <App tweetService={tweetService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
