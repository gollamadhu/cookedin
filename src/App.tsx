import React, { useState } from "react";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  const [currentPage, setCurrentPage] = useState<"login" | "register">("login");

  return (
    <div>
      {currentPage === "login" && (
        <Login goToRegister={() => setCurrentPage("register")} />
      )}

      {currentPage === "register" && (
        <Register goToLogin={() => setCurrentPage("login")} />
      )}
    </div>
  );
}

export default App;
