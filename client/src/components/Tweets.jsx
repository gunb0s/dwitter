import React from "react";
import dummy from "../dummy/tweets.json";
import Tweet from "./Tweet";

const Tweets = () => {
  return (
    <div className="w-full h-full bg-zinc-100 px-5">
      {dummy.tweets.map((tweet, id) => (
        <Tweet key={id} data={tweet} />
      ))}
    </div>
  );
};

export default Tweets;
