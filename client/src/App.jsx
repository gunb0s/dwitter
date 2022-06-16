import React from "react";
import TwitterBar from "./components/TwitterBar";

const wrapper = "w-screen h-screen flex justify-center items-center";
const main = "w-[36rem] h-[50rem] bg-slate-200 drop-shadow-2xl";

const App = () => {
  return (
    <div className={wrapper}>
      <main className={main}>
        <TwitterBar />
      </main>
    </div>
  );
};

export default App;
