import React, { useState } from "react";
import Wrapper from "../../components/utils/Wrapper";
import Button from "../../components/utils//formComponents/ButtonComponent";
import InputComponent from "../../components/utils/formComponents/InputComponent";
import {
  CurrentUserDocument,
  useRegisterMutation,
} from "../../generated/generate";
import { useRouter } from "next/router";

interface RegisterState {
  username: string;
  password: string;
  repeatPassword: string;
  errors: {
    username: string;
    password: string;
    repeatPassword: string;
  };
}

const register = () => {
  const router = useRouter();

  const [credentials, setCredentials] = useState<RegisterState>({
    username: "",
    password: "",
    repeatPassword: "",
    errors: {
      username: "",
      password: "",
      repeatPassword: "",
    },
  });

  const [register] = useRegisterMutation();

  const handleCredentials = (e: React.FormEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isFormValid = true;

    const stateErrors = {
      username: "",
      password: "",
      repeatPassword: "",
    };

    if (credentials.username.length < 6) {
      stateErrors.username = "Username should have more than 6 chars!";
      isFormValid = false;
    }
    if (credentials.password.length < 6) {
      stateErrors.password = "Password should have more than 6 chars!";
      isFormValid = false;
    }
    if (credentials.repeatPassword !== credentials.password) {
      stateErrors.repeatPassword = "Passwords aren't equal!";
      isFormValid = false;
    }

    if (!isFormValid)
      return setCredentials({ ...credentials, errors: stateErrors });

    const { data } = await register({
      variables: {
        username: credentials.username,
        password: credentials.password,
        confirmPassword: credentials.repeatPassword,
      },
      refetchQueries: [{ query: CurrentUserDocument }],
    });

    if (data?.register?.errors) {
      const { errors } = data.register;
      const stateErrors = {
        username: "",
        password: "",
        repeatPassword: "",
      };
      errors.forEach((error) => {
        const err = error.field as "username" | "password" | "repeatPassword";
        stateErrors[err] = error.message;
      });
      return setCredentials({
        ...credentials,
        errors: stateErrors,
      });
    }
    router.push("/profile/createProfile");
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
            errorText={credentials.errors.username}
          />
          <InputComponent
            placeholder="Password"
            label={{ text: "Password" }}
            id="register_password"
            type="password"
            name="password"
            handleInput={handleCredentials}
            value={credentials.password}
            errorText={credentials.errors.password}
          />
          <InputComponent
            placeholder="Repeat password"
            label={{ text: "Repeat password" }}
            id="register_repeat_password"
            type="password"
            name="repeatPassword"
            handleInput={handleCredentials}
            value={credentials.repeatPassword}
            errorText={credentials.errors.repeatPassword}
          />
          <Button className="secondary mt-2" text="Register" type="submit" />
        </form>
      </div>
    </Wrapper>
  );
};

export default register;
