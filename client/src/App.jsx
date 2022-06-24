import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import TwitterBar from "./components/TwitterBar";
import AllTweets from "./pages/AllTweets";
import Login from "./pages/Login";
import MyTweets from "./pages/MyTweets";

const wrapper =
  "w-screen h-screen flex justify-center items-center overflow-auto";
const main = "w-[36rem] h-[50rem] bg-slate-200 drop-shadow-2xl flex flex-col";

const App = ({ tweetService }) => {
  return (
    <div className={wrapper}>
      <main className={main}>
        <TwitterBar />
        <Routes>
          <Route
            exact
            path="/"
            element={<AllTweets tweetService={tweetService} />}
          />
          <Route
            exact
            path="/:username"
            element={<MyTweets tweetService={tweetService} />}
          />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
