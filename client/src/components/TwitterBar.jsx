import React from "react";

const wrapper = "relative w-full h-28 p-10 bg-slate-300";
const logo_wrapper = "flex h-full items-center";
const logo_image = "w-16 h-16 mr-2";
const username = "absolute bottom-3 right-6";

const TwitterBar = () => {
  return (
    <div className={wrapper}>
      <div className={logo_wrapper}>
        <img className={logo_image} src="twitter_logo.png" alt="logo" />
        <div className="text-xl">Dwitter</div>
      </div>
      <div className={username}>username</div>
    </div>
  );
};

export default TwitterBar;
