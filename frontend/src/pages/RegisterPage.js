import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import makeToast from "../Toaster";
const RegisterPage = () => {
  const emailRef = React.createRef();
  const nameRef = React.createRef();
  const passwordRef = React.createRef();
  const navigate = useNavigate();

  const registerUser = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    axios
      .post("http://localhost:800/user/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        makeToast("success", res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        makeToast("error", err.response.data.message);

        console.log(err);
      });
  };
  return (
    <div className="card">
      <div className="cardHeader">Register</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            ref={nameRef}
          />
        </div>
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
        <button onClick={registerUser}>Register</button>
      </div>
    </div>
  );
};

export default RegisterPage;
