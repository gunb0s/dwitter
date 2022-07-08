import React, { useState } from "react";
import { Update, Close } from "@mui/icons-material";

const TweetEditForm = ({ tweet, onUpdate, onEditClose, onError }) => {
  const [content, setContent] = useState(tweet.content);

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const handleUpdate = () => {
    if (content.trim() === "") {
      onError(new Error("content should not be empty"));
      return;
    }
    onUpdate(tweet.id, content);
    setContent("");
    onEditClose();
  };

  const onSubmit = () => {
    handleUpdate();
  };

  const onKeyUpSubmit = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  return (
    <div className="pb-8 w-full">
      <textarea
        className="w-full h-full outline-none p-2 resize-none "
        required
        autoFocus
        type="text"
        placeholder="Edit tweets..."
        value={content}
        onChange={onChange}
        onKeyUp={onKeyUpSubmit}
      />
      <div className="absolute bottom-3 right-6">
        <button className="mr-3" onClick={onSubmit}>
          <Update fontSize="small" />
        </button>
        <button onClick={onEditClose}>
          <Close fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default TweetEditForm;
