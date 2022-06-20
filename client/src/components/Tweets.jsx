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
      .then((tweets) => setTweets([...tweets]))
      .catch((error) => setError(error.toString()));
  }, [tweetService]);

  const onCreated = (tweet) => {
    setTweets((tweets) => [tweet, ...tweets]);
  };

  const onUpdate = (id, content) => {
    tweetService
      .update(id, content) ///
      .then((updated) =>
        setTweets((tweets) =>
          tweets.map((item) => (item._id === updated._id ? updated : item))
        )
      )
      .catch((error) => onError(error.toString()));
  };

  const onDelete = (id) => {
    tweetService ///
      .remove(id)
      .then(() =>
        setTweets((tweets) => tweets.filter((item) => item._id !== id))
      );
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
      {tweets.length === 0 && <p className="p-5 font-joans">No Tweets Yet</p>}
      <div className="w-full h-full bg-zinc-100 px-5 overflow-auto">
        {tweets.map((tweet) => (
          <Tweet
            key={tweet._id}
            tweet={tweet}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onError={onError}
          />
        ))}
      </div>
    </>
  );
};

export default Tweets;
