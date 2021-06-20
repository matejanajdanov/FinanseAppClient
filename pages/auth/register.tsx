import React, { useState } from "react";
import InputComponent from "../../components/utils/formComponents/InputComponent";

const register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleCredentials = (e: React.FormEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: [e.currentTarget.value],
    });
  };

  return (
    <div>
      <InputComponent
        placeholder="Username"
        label={{ text: "Username" }}
        id="login_username"
        name="username"
        handleInput={handleCredentials}
        value={credentials.username}
      />

      <InputComponent
        placeholder="Username"
        label={{ text: "Password" }}
        id="login_password"
        name="password"
        handleInput={handleCredentials}
        value={credentials.username}
      />
    </div>
  );
};

export default register;
