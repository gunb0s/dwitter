import React, { useEffect, useState } from "react";
import Tweet from "./Tweet";
import TweetInput from "./TweetInput";
import Banner from "./Banner";

const Tweets = ({ tweetService, addable }) => {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    tweetService
      .getAll() ///
      .then((res) => setTweets([...res.tweets]))
      .catch((error) => setError(error.toString()));
  }, [tweetService]);

  const onCreated = (tweet) => {
    setTweets((tweets) => [tweet, ...tweets]);
  };

  const onError = (error) => {
    setError(error.toString());
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <>
      {addable && (
        <TweetInput
          onError={onError}
          tweetService={tweetService}
          onCreated={onCreated}
        />
      )}
      {error && <Banner text={error} isAlert={true} transient={true} />}
      {tweets.length === 0 && <p>No Tweets Yet</p>}
      <div className="w-full h-full bg-zinc-100 px-5">
        {tweets.map((tweet) => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </>
  );
};

export default Tweets;
