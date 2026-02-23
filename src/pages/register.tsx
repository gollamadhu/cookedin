import React, { useState } from "react";
import "./login.css";

type RegisterProps = {
  goToLogin: () => void;
};

function Register({ goToLogin }: RegisterProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [serverMessage, setServerMessage] = useState<string>("");

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    if (value === "") {
      setUsernameError("Username is required");
    } else {
      setUsernameError("");
    }
  };

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

  const handleRegister = async () => {
    if (!username) {
      setUsernameError("Username is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:2001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setServerMessage("Registration successful 🎉 Redirecting...");
        setUsername("");
        setPassword("");

        setTimeout(() => {
          goToLogin();
        }, 1500);
      } else {
        setServerMessage(data.message);
      }
    } catch (error) {
      setServerMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="LoginPage">
      <div className="loginContainer">
        <h2>Register</h2>

        <div className="loginpageInputFeilds">
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsername} />
          {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
        </div>

        <div className="loginpageInputFeilds">
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePassword} />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>

        {serverMessage && (
          <p style={{ marginTop: "10px", color: "green" }}>
            {serverMessage}
          </p>
        )}

        <button className="loginBtn" onClick={handleRegister}>
          Register
        </button>

        <div className="switchText">
          Already have an account?{" "}
          <button className="linkBtn" onClick={goToLogin}>
            Login Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;