import React, { useState } from "react";
import InputComponent from "../../components/utils/InputComponent";
import Wrapper from "../../components/utils/Wrapper";

const login = () => {
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
    <Wrapper>
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
    </Wrapper>
  );
};

export default login;
