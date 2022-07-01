import React, { memo } from "react";

const Banner = memo(({ text, isAlert }) => (
  <>
    {text && (
      <p className={`p-5 ${isAlert ? "bg-red-500" : "bg-green-500"}`}>{text}</p>
    )}
  </>
));
export default Banner;
