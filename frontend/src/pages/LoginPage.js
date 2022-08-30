import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import makeToast from "../Toaster";
import "bootstrap/dist/css/bootstrap.min.css"

const LoginPage = () => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const navigate = useNavigate();

  const loginUser = async () => {
    const localStorageName=localStorage.getItem("name")
    const localStorageToken=localStorage.getItem("token")
    
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    axios
      .post("http://localhost:800/user/login", {
        email,
        password,
      })
      .then(async (res) => {
        
        localStorage.clear()
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
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              ref={emailRef}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              ref={passwordRef}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="button" onClick={loginUser} className="btn btn-primary">
              Login
            </button>
          </div>
         <br></br>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
