import React, { memo, useState } from "react";
import { MoreHoriz } from "@mui/icons-material";
import TweetOperation from "./TweetOperation";
import TweetEditForm from "./TweetEditForm";
import Avatar from "./Avatar";

const Tweet = memo(({ tweet, onUpdate, onDelete, onError }) => {
  const [tweetOperation, setTweetOperation] = useState(false);
  const [editing, setEditing] = useState(false);
  const onOperationClose = () => setTweetOperation(false);
  const onEdit = () => setEditing(true);
  const onEditClose = () => setEditing(false);
  const handleDelete = () => {
    onDelete(tweet.id);
  };

  return (
    <div className="relative bg-white w-full flex gap-3 my-4 p-4 rounded-lg">
      <div className="rounded-full">
        <Avatar url={tweet.url} username={tweet.username} />
      </div>
      <div className="w-full flex flex-col">
        <div className="mb-3">
          <span className="text-base mr-2">{tweet.username}</span>
          <span className="text-sm text-slate-400 mr-2">@{tweet.name}</span>
          <span className="text-sm text-slate-400">
            {new Date(tweet.createdAt).toLocaleString()}
          </span>
        </div>
        {editing ? (
          <TweetEditForm
            tweet={tweet}
            onUpdate={onUpdate}
            onEditClose={onEditClose}
            onError={onError}
          />
        ) : (
          <div className="pb-8 break-all ">{tweet.content}</div>
        )}
      </div>
      {!editing && (
        <>
          <div className="absolute bottom-3 right-6">
            <button
              onClick={() => {
                setTweetOperation((prev) => !prev);
              }}
            >
              <MoreHoriz fontSize="small" />
            </button>
          </div>
          {tweetOperation && (
            <TweetOperation
              onOperationClose={onOperationClose}
              onEdit={onEdit}
              handleDelete={handleDelete}
            />
          )}
        </>
      )}
    </div>
  );
});

export default Tweet;
