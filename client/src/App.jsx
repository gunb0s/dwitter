import React, { useState, useEffect } from "react";
import TweetInput from "./components/TweetInput";
import Tweets from "./components/Tweets";
import TwitterBar from "./components/TwitterBar";

const wrapper =
  "w-screen h-screen flex justify-center items-center overflow-auto";
const main = "w-[36rem] h-[50rem] bg-slate-200 drop-shadow-2xl flex flex-col";

const App = ({ tweetService }) => {
  const [tweets, setTweets] = useState();

  useEffect(() => {
    tweetService
      .getAll() ///
      .then((data) => setTweets(data));
  }, []);

  return (
    <div className={wrapper}>
      <main className={main}>
        <TwitterBar />
        <TweetInput />
        <Tweets />
      </main>
    </div>
  );
};

export default App;
