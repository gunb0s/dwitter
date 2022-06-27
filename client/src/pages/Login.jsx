import React, { useState } from "react";
import Banner from "../components/Banner";

const input = "outline-none px-3 py-1";

const Login = () => {
  const [signup, setSignup] = useState(false);
  const [error, setError] = useState("");
  const [signData, setSignData] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    name: "",
    email: "",
    avatar: "",
  });

  const onChange = (e) => {
    setSignData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (signup) {
      onSignup();
    } else {
      onSignin();
    }
  };

  const onSignup = () => {};

  const onSignin = () => {};

  const onCreateAccountClick = () => {
    setSignup((prev) => !prev);
  };

  return (
    <div>
      {error && <Banner text={error} />}
      <form className="flex flex-col p-5 gap-3" onSubmit={onSubmit}>
        <input
          className={input}
          type="text"
          placeholder="id"
          required
          onChange={onChange}
          value={signData.username}
          name="username"
        />
        <input
          className={input}
          type="password"
          placeholder="password"
          required
          onChange={onChange}
          value={signData.password}
          name="password"
        />
        {signup && (
          <input
            className={input}
            type="password"
            placeholder="password-check"
            required
            onChange={onChange}
            value={signData.passwordCheck}
            name="passwordCheck"
          />
        )}
        {signup && (
          <input
            className={input}
            type="text"
            placeholder="name"
            required
            onChange={onChange}
            value={signData.name}
            name="name"
          />
        )}
        {signup && (
          <input
            className={input}
            type="email"
            placeholder="email"
            required
            onChange={onChange}
            value={signData.email}
            name="email"
          />
        )}
        {signup && (
          <input
            className={input}
            type="text"
            placeholder="Profile Image URL"
            onChange={onChange}
            value={signData.avatar}
            name="avatar"
          />
        )}
        <div className="flex items-center">
          <input
            className="mr-3"
            name="signup"
            type="checkbox"
            checked={signup}
            onChange={onCreateAccountClick}
          />
          <label htmlFor="signup">Create a new account?</label>
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
