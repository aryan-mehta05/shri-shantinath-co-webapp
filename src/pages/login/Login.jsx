import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="box">
      <form autoComplete="off">
        <h2>Sign in</h2>
        <div className="inputBox">
          <input type="text" required="required" />
          <span>Userame</span>
          <i />
        </div>
        <div className="inputBox">
          <input type="password" required="required" />
          <span>Password</span>
          <i />
        </div>
        <div className="links">
          <a href="#">Forgot Password ?</a>
        </div>
        <input type="submit" defaultValue="Login" />
      </form>
    </div>
  );
};

export default Login;
