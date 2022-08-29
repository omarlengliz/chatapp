import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import makeToast from "../Toaster";

const LoginPage = () => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const navigate = useNavigate();

  const loginUser = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    axios
      .post("http://localhost:800/user/login", {
        email,
        password,
      })
      .then(async (res) => {
        console.log(res.data.message);
        makeToast("success", res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.userName);
        navigate("/dashboard");
      })
      .catch((err) => {
        makeToast("error", err.response.data.message);
      });
  };
  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@example.com"
            ref={emailRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
        </div>
        <button onClick={loginUser}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
