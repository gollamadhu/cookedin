import React, { useState } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import LoginPageMain from "./pages/loginPageMain"; // Profile page

function App() {
  const [currentPage, setCurrentPage] = useState<
    "login" | "register" | "profile"
  >("login");

  const [loggedInUser, setLoggedInUser] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const goToRegister = () => {
    setCurrentPage("register");
  };

  const goToLogin = () => {
    setCurrentPage("login");
  };

  const handleLoginSuccess = (username: string) => {
    setLoggedInUser(username);
    setCurrentPage("profile");
  };

  const onlogout = () => {
  setLoggedInUser("");
  setCurrentPage("login");
  } ;

  return (
    <div>
      {currentPage === "login" && (
        <Login
          goToRegister={goToRegister}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentPage === "register" && (
        <Register goToLogin={goToLogin} />
      )}

      {currentPage === "profile" && (
        <LoginPageMain username={loggedInUser} onLogout={onlogout} 
/>
      )}
    </div>
  );
}

export default App;