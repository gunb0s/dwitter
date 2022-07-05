import React, { useState } from "react";

const TweetInput = ({ tweetService, onCreated, onError }) => {
  const [tweet, setTweet] = useState("");

  const onChange = (e) => {
    setTweet(e.target.value);
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      tweetService
        .create(tweet) ///
        .then((created) => {
          setTweet("");
          // onCreated(created);
        })
        .catch(onError);
    }
  };

  return (
    <div className="w-full">
      <input
        required
        autoFocus
        value={tweet}
        className="w-full outline-none p-2 "
        type="text"
        placeholder="Enter tweet..."
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
    </div>
  );
};

export default TweetInput;
