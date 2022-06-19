import React from "react";
import Tweets from "../components/Tweets";

const AllTweets = ({ tweetService }) => {
  return <Tweets tweetService={tweetService} addable={true} />;
};

export default AllTweets;
