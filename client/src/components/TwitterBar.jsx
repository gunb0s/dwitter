import React, { memo } from "react";

const wrapper = "relative flex w-full h-28 p-10 bg-zinc-100";
const logo_wrapper = "flex h-full items-center cursor-pointer";
const logo_image = "w-8 h-8 mr-2";
const user_controll = "absolute bottom-3 right-6 text-sm cursor-pointer";

const TwitterBar = memo(({ username, onLogout, onMyTweets, onAllTweets }) => {
  return (
    <div className={wrapper}>
      <div className={logo_wrapper} onClick={onAllTweets}>
        <img className={logo_image} src="twitter_logo.png" alt="logo" />
        <div className="text-2xl font-dancingScripts font-bold">Dwitter</div>
      </div>
      {username && (
        <div
          className="text-sm  ml-3 self-end cursor-pointer"
          onClick={onMyTweets}
        >
          @{username}
        </div>
      )}
      {username && (
        <div className={user_controll} onClick={onLogout}>
          Logout
        </div>
      )}
    </div>
  );
});

export default TwitterBar;
