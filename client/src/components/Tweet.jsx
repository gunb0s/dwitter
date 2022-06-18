import React from "react";
import { Edit, Delete } from "@mui/icons-material";

const Tweet = ({ data }) => {
  return (
    <div className="relative bg-white w-full flex gap-3 my-4 p-4 rounded-lg">
      <div className="rounded-full">
        <img className="w-10 h-10 rounded-full" src={data.url} alt="avatar" />
      </div>
      <div className="w-full flex flex-col">
        <div className="mb-3">
          <span className="text-base mr-2">{data.username}</span>
          <span className="text-sm text-slate-400 mr-2">@{data.name}</span>
          <span className="text-sm text-slate-400">
            {new Date(data.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="pb-8 break-all">{data.content}</div>
      </div>
      <div className="absolute bottom-3 right-6">
        <button className="mr-4">
          <Edit />
        </button>
        <button>
          <Delete />
        </button>
      </div>
    </div>
  );
};

export default Tweet;
