import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "Ok") {
          localStorage.setItem("token", data.data);
          history.push("/dashboard");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="box">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Sign in</h2>
        <div className="inputBox">
          <input
            type="text"
            required="required"
            onChange={(e) => setUsername(e.target.value)}
          />
          <span>Username</span>
          <i />
        </div>
        <div className="inputBox">
          <input
            type="password"
            required="required"
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
  );
};

export default Login;