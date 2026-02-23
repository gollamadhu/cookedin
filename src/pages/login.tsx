import React, { useState } from "react";
import "./login.css";

type LoginProps = {
  goToRegister: () => void;
};

function Login({ goToRegister }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  // Username validation
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    if (value === "") {
      setUsernameError("Username is required");
    } else {
      setUsernameError("");
    }
  };

  // Password validation
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value === "") {
      setPasswordError("Password is required");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else if (
      
      !value.includes("@") &&
      !value.includes("#") &&
      !value.includes("$")
    ) {
      setPasswordError("Password must contain at least one special character (@, #, $)");
    } else {
      setPasswordError("");
    }
  };

  // Login API call
  const handleLogin = async () => {
    // Final frontend validation
    if (username === "") {
      setUsernameError("Username is required");
      return;
    }

    if (password === "") {
      setPasswordError("Password is required");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:2001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful 🎉");

        // Clear fields
        setUsername("");
        setPassword("");
        setUsernameError("");
        setPasswordError("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="LoginPage">
      <div className="loginContainer">
        <h2>Login</h2>

        <div className="loginpageInputFeilds">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsername}
          />
          {usernameError && (
            <p style={{ color: "red" }}>{usernameError}</p>
          )}
        </div>

        <div className="loginpageInputFeilds">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePassword}
          />
          {passwordError && (
            <p style={{ color: "red" }}>{passwordError}</p>
          )}
        </div>

        <button className="loginBtn" onClick={handleLogin}>
          Login
        </button>

        <div className="switchText">
          Don't have an account?{" "}
          <button className="linkBtn" onClick={goToRegister}>
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;