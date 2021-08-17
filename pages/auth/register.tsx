import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  AppFormCard,
  AppWrapper,
  AppButton,
  AppInput,
  AppLink,
} from "components";
import {
  CurrentUserDocument,
  useRegisterMutation,
} from "../../generated/generate";
import { useRedirectIfLoged } from "hooks/redirect";

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

  useRedirectIfLoged("/profile/createProfile", "/profile");

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
    <AppWrapper width="wrapper-sm" textAlign="center">
      <div className="auth-container mt-20">
        <div className="text-left">
          <AppLink
            href="/"
            type="small-link"
            textAlign="left"
            color="primary"
            bgColor="bg-primary"
            className="ml-3 mb-1"
          >
            <i className="fas fa-chevron-left"></i>
            Back
          </AppLink>
        </div>
        <AppFormCard>
          <h1 className="mb-7 text-light">Register and start saving!</h1>
          <form onSubmit={onFormSubmit}>
            <AppInput
              placeholder="Username"
              id="login_username"
              name="username"
              handleInput={handleCredentials}
              value={credentials.username}
              errorText={credentials.errors.username}
              className="mb-3"
            />
            <AppInput
              placeholder="Password"
              id="register_password"
              type="password"
              name="password"
              handleInput={handleCredentials}
              value={credentials.password}
              errorText={credentials.errors.password}
              className="mb-3"
            />
            <AppInput
              placeholder="Repeat password"
              id="register_repeat_password"
              type="password"
              name="repeatPassword"
              handleInput={handleCredentials}
              value={credentials.repeatPassword}
              errorText={credentials.errors.repeatPassword}
              className="mb-3"
            />
            <AppButton
              className="secondary mt-2"
              text="Register"
              type="submit"
            />
          </form>
        </AppFormCard>
      </div>
    </AppWrapper>
  );
};

export default register;
