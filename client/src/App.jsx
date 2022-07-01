import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import TwitterBar from "./components/TwitterBar";
import AllTweets from "./pages/AllTweets";
import Login from "./pages/Login";
import MyTweets from "./pages/MyTweets";
import { useAuth } from "./context/AuthContext";

const wrapper =
  "w-screen h-screen flex justify-center items-center overflow-auto";
const main = "w-[36rem] h-[50rem] bg-slate-200 drop-shadow-2xl flex flex-col";

const App = ({ tweetService }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onAllTweets = () => {
    navigate("/");
  };

  const onMyTweets = () => {
    navigate(`/${user.username}`);
  };

  const onLogout = () => {
    if (window.confirm("Do you want to log out?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <div className={wrapper}>
      <main className={main}>
        <TwitterBar
          username={user.username}
          onLogout={onLogout}
          onAllTweets={onAllTweets}
          onMyTweets={onMyTweets}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={<AllTweets tweetService={tweetService} />}
          />
          <Route
            exact
            path="/:username"
            element={<MyTweets tweetService={tweetService} />}
          />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
