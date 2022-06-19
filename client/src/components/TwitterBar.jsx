import React from "react";
import { useNavigate } from "react-router-dom";

const wrapper = "relative w-full h-28 p-10 bg-zinc-100";
const logo_wrapper = "flex h-full items-center cursor-pointer";
const logo_image = "w-8 h-8 mr-2";
const username = "absolute bottom-3 right-6 text-sm";

const TwitterBar = () => {
  const navigate = useNavigate();

  const onAllTweets = () => {
    navigate("/");
  };

  return (
    <div className={wrapper}>
      <div className={logo_wrapper} onClick={onAllTweets}>
        <img className={logo_image} src="twitter_logo.png" alt="logo" />
        <div className="text-2xl font-dancingScripts font-bold">Dwitter</div>
      </div>
      <div className={username}>username</div>
    </div>
  );
};

export default TwitterBar;
