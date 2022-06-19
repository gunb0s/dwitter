import React, { useState } from "react";
import { MoreHoriz } from "@mui/icons-material";
import TweetOperation from "./TweetOperation";

const Tweet = ({ tweet }) => {
  const [tweetOperation, setTweetOperation] = useState(false);

  return (
    <div className="relative bg-white w-full flex gap-3 my-4 p-4 rounded-lg">
      <div className="rounded-full">
        <img className="w-10 h-10 rounded-full" src={tweet.url} alt="avatar" />
      </div>
      <div className="w-full flex flex-col">
        <div className="mb-3">
          <span className="text-base mr-2">{tweet.username}</span>
          <span className="text-sm text-slate-400 mr-2">@{tweet.name}</span>
          <span className="text-sm text-slate-400">
            {new Date(tweet.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="pb-8 break-all">{tweet.content}</div>
      </div>
      <div className="absolute bottom-3 right-6">
        <button
          onClick={() => {
            setTweetOperation((prev) => !prev);
          }}
        >
          <MoreHoriz fontSize="small" />
        </button>
      </div>
      {tweetOperation && (
        <TweetOperation setTweetOperation={setTweetOperation} />
      )}
    </div>
  );
};

export default Tweet;
