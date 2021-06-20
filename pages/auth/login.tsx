import React, { useState } from "react";
import { useLoginMutation } from "../../generated/generate";
import InputComponent from "../../components/utils/formComponents/InputComponent";
import ButtonComponent from "../../components/utils/formComponents/ButtonComponent";
import Wrapper from "../../components/utils/Wrapper";
import styles from "../../styles/pages/auth/login.module.scss";

interface authState {
  username: { text: string; error: string };
  password: { text: string; error: string };
}

const login = () => {
  const [credentials, setCredentials] = useState<authState>({
    username: { text: "", error: "" },
    password: { text: "", error: "" },
  });
  const [login] = useLoginMutation();

  const handleCredentials = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name as "username" | "password";
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: {
        ...credentials[name],
        text: e.currentTarget.value,
      },
    });
  };
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username.text.length < 6) {
      return setCredentials({
        ...credentials,
        username: {
          ...credentials.username,
          error: "Please enter username that has more than 6 characters!",
        },
      });
    }
    if (credentials.password.text.length < 6) {
      return setCredentials({
        ...credentials,
        password: {
          ...credentials.password,
          error: "Please enter password that has more than 6 characters!",
        },
      });
    }
    const { data } = await login({
      variables: {
        username: credentials.username.text,
        password: credentials.password.text,
      },
    });

    if (data?.login.errors) {
      const errors = data.login.errors;
      errors.map((error) => {
        const errorField = error.field as "username" | "password";
        setCredentials({
          ...credentials,
          [errorField]: { ...credentials[errorField], error: error.message },
        });
      });
    }
  };

  return (
    <Wrapper className="wrapper-sm">
      <div className={styles["login-container"]}>
        <form onSubmit={onFormSubmit}>
          <InputComponent
            placeholder="Username"
            label={{ text: "Username" }}
            id="login_username"
            name="username"
            handleInput={handleCredentials}
            value={credentials.username.text}
            type="text"
            errorText={credentials.username.error}
          />
          <InputComponent
            placeholder="Password"
            label={{ text: "Password" }}
            id="login_password"
            name="password"
            handleInput={handleCredentials}
            value={credentials.password.text}
            type="password"
            errorText={credentials.password.error}
          />
          <ButtonComponent text="Login" type="submit" className="primary" />
        </form>
      </div>
    </Wrapper>
  );
};

export default login;
