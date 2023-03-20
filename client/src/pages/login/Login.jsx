import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username, password);
    await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((response) => response.json()).then((data) => {
        console.log(data);
        if (data.status === "Ok") {
          localStorage.setItem("token", data.data);
          window.location = "/";
        }
      }).catch((error) => {
        if (
          error.response && 
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <div className="login-background">
      <div className="box">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Sign in</h2>
          <div className="inputBox">
            <input
              type="text"
              name="username"
              required="required"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span>Username</span>
            <i />
          </div>
          <div className="inputBox">
            <input
              type="password"
              name="password"
              required="required"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
            <i />
          </div>
          <div className="links">
            <a href="#">Forgot Password ?</a>
          </div>
          <input type="submit" defaultValue="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;