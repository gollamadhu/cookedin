import React, { useState } from "react";

type Props = {
  username: string;
  onLogout: () => void;
};

function LoginPageMain({ username,onLogout}: Props) {

  const [handleButtonClick, setHandleButtonClick] = useState<boolean>(false);
  const [onClickLogout, setOnClickLogout] = useState<boolean>(false);

  const toggleButton = () => {
    setHandleButtonClick(!handleButtonClick);
  };
  const toggleLogout = () => {

     setHandleButtonClick(false);
     onLogout();
  }

  return (
    <div>
      <button onClick={toggleButton}>
        Welcome {username}
      </button>

      {handleButtonClick && (
        <button onClick={toggleLogout}>
          Logout
        </button>
      )}

      <h1>Welcome, {username}!</h1>
    </div>
  );
}

export default LoginPageMain;