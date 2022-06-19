import React from "react";

const li = "text-sm font-joans cursor-pointer";
const span = "hover:bg-white p-1 pr-4 w-full";

const TweetOperation = ({ onOperationClose, onEdit, handleDelete }) => {
  return (
    <div className="absolute bottom-8 -right-2 shadow-lg z-10 bg-slate-100 rounded-md">
      <ul>
        <li
          className={`${li} mb-1`}
          onClick={() => {
            onOperationClose();
            onEdit();
          }}
        >
          <div className={span}>edit</div>
        </li>
        <li
          className={li}
          onClick={() => {
            onOperationClose();
            handleDelete();
          }}
        >
          <div className={span}>delete</div>
        </li>
      </ul>
    </div>
  );
};

export default TweetOperation;
