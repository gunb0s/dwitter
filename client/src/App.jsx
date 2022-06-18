import React from "react";
import TweetInput from "./components/TweetInput";
import TwitterBar from "./components/TwitterBar";

const wrapper =
  "w-screen h-screen flex justify-center items-center overflow-auto";
const main = "w-[36rem] h-[50rem] bg-slate-200 drop-shadow-2xl flex flex-col";

const App = () => {
  return (
    <div className={wrapper}>
      <main className={main}>
        <TwitterBar />
        <TweetInput />
      </main>
    </div>
  );
};

export default App;
