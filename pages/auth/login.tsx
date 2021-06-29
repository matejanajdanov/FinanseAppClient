import React, { useState } from "react";
import {
  useLoginMutation,
  CurrentUserDocument,
} from "../../generated/generate";
import InputComponent from "../../components/utils/formComponents/InputComponent";
import ButtonComponent from "../../components/utils/formComponents/ButtonComponent";
import Wrapper from "../../components/utils/Wrapper";
import { useRouter } from "next/router";

interface LoginState {
  username: string;
  password: string;
  errors: {
    username: string;
    password: string;
  };
}

const login = () => {
  const router = useRouter();

  const [credentials, setCredentials] = useState<LoginState>({
    username: "",
    password: "",
    errors: {
      username: "",
      password: "",
    },
  });
  const [login] = useLoginMutation();

  const handleCredentials = (e: React.FormEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  console.log(credentials, "password");
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const stateErrors = {
      username: "",
      password: "",
    };
    let isFormValid = true;
    if (credentials.username.length < 2) {
      stateErrors.username = "Username should have more than 6 chars!";
      isFormValid = false;
    }
    if (credentials.password.length < 2) {
      stateErrors.password = "Password should have more than 6 chars!";
      isFormValid = false;
    }
    if (!isFormValid)
      return setCredentials({ ...credentials, errors: stateErrors });

    const { data } = await login({
      variables: {
        username: credentials.username,
        password: credentials.password,
      },
      refetchQueries: [{ query: CurrentUserDocument }],
    });
    if (data?.login.errors) {
      const { errors } = data.login;
      const stateErrors = {
        username: "",
        password: "",
      };
      errors.forEach((error) => {
        const err = error.field as "username" | "password";
        stateErrors[err] = error.message;
      });
      return setCredentials({
        ...credentials,
        errors: stateErrors,
      });
    }
    !data?.login.user?.profile
      ? router.push("/profile/createProfile")
      : router.push("/");
  };
  return (
    <Wrapper className="wrapper-sm">
      <div className="auth-container mt-3">
        <form onSubmit={onFormSubmit}>
          <InputComponent
            placeholder="Username"
            label={{ text: "Username" }}
            id="login_username"
            name="username"
            handleInput={handleCredentials}
            value={credentials.username}
            type="text"
            errorText={credentials.errors.username}
          />
          <InputComponent
            placeholder="Password"
            label={{ text: "Password" }}
            id="login_password"
            name="password"
            handleInput={handleCredentials}
            value={credentials.password}
            type="password"
            errorText={credentials.errors.password}
          />
          <ButtonComponent text="Login" type="submit" className="secondary" />
        </form>
      </div>
    </Wrapper>
  );
};

export default login;
