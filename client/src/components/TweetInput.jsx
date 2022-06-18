import React from "react";

const TweetInput = () => {
  return (
    <div className="w-full">
      <input
        className="w-full outline-none p-2 font-joans"
        type="text"
        placeholder="Enter tweet..."
      />
    </div>
  );
};

export default TweetInput;
