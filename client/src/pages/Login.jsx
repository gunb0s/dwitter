import React, { useState } from "react";
import Banner from "../components/Banner";

const input = "outline-none font-joans px-3 py-1";

const Login = () => {
  const [signup, setSignup] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onCreateAccount = () => {
    setSignup(true);
  };

  return (
    <div>
      {error && <Banner text={error} />}
      <form className="flex flex-col p-5 gap-3" onSubmit={onSubmit}>
        <input className={input} type="text" placeholder="id" required />
        <input
          className={input}
          type="password"
          placeholder="password"
          required
        />
        {signup && (
          <input
            className={input}
            type="password"
            placeholder="password-check"
            required
          />
        )}
        {signup && (
          <input
            className={input}
            type="text"
            placeholder="username"
            required
          />
        )}
        {signup && (
          <input className={input} type="text" placeholder="name" required />
        )}
        {signup && (
          <input className={input} type="text" placeholder="avatar" required />
        )}
        <div
          className="text-sm self-center hover:underline cursor-pointer"
          onClick={onCreateAccount}
        >
          {signup ? "" : "Create account"}
        </div>
        <button
          className="bg-zinc-100 self-center px-3 py-1 my-5 rounded-lg"
          type="submit"
        >
          {signup ? "signup" : "signin"}
        </button>
      </form>
    </div>
  );
};

export default Login;
