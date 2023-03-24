import React, { useState } from "react";
import "./Login.css";
import { IonIcon } from "@ionic/react";
import { mailOutline, lockClosedOutline } from "ionicons/icons";

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
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "Ok") {
          localStorage.setItem("token", data.data[0]);
          localStorage.setItem("isAdmin", data.data[1]);
          window.location = "/";
        } else {
          setError("Invalid username or password");
          alert("Error: Invalid username or password");
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
          alert("Error: " + error.response.data.message);
        }
      });
  };

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form action="" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="inputbox">
              <IonIcon icon={mailOutline} />
              <input
                type="text"
                name="username"
                required="required"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="">Username</label>
            </div>
            <div className="inputbox">
              <IonIcon icon={lockClosedOutline} />
              <input
                type="password"
                name="password"
                required="required"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="">Password</label>
            </div>
            <div className="forget">
              <a href="#">Forgot Password</a>
            </div>
            <button>Log in</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
