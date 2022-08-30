import React  from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import makeToast from "../Toaster";
import { Link } from "react-router-dom";
import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css"

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
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" >
              <Link to="/login">Login</Link>
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder=" Jhon Doe"
              ref={nameRef}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              ref={emailRef}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="button" onClick={registerUser} className="btn btn-primary">
              Register
            </button>
          </div>
       <br></br>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
