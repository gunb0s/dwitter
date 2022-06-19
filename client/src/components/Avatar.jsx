import React from "react";

const style = "w-10 h-10 rounded-full";

const Avatar = ({ url, username }) => {
  return (
    <>
      {!!url ? (
        <img className={style} src={url} alt="avatar" />
      ) : (
        <div
          className={`${style} flex items-center justify-center bg-orange-300`}
        >
          {username.charAt(0).toUpperCase()}
        </div>
      )}
    </>
  );
};

export default Avatar;
