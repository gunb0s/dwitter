import React, { useState } from "react";
import { Update, Close } from "@mui/icons-material";

const TweetEditForm = ({ tweet, onUpdate, onEditClose }) => {
  const [content, setContent] = useState(tweet.content);

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    onUpdate(tweet._id, content);
    setContent("");
    onEditClose();
  };

  const onKeyUpSubmit = (e) => {
    if (e.key === "Enter") {
      onUpdate(tweet._id, content);
      setContent("");
      onEditClose();
    }
  };

  return (
    <div className="pb-8 w-full">
      <textarea
        className="w-full h-full outline-none p-2 resize-none font-joans"
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
