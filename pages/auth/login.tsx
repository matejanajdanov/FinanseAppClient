import React, { useState } from 'react';
import { useRouter } from 'next/router';

import {
  AppFormCard,
  AppWrapper,
  AppButton,
  AppInput,
  AppLink,
} from 'components';

import {
  CurrentUserDocument,
  useLoginMutation,
} from '../../generated/generate';
import { useRedirectIfLoged } from 'hooks/redirect';

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

  useRedirectIfLoged('/profile/createProfile', '/profile');

  const [credentials, setCredentials] = useState<LoginState>({
    username: '',
    password: '',
    errors: {
      username: '',
      password: '',
    },
  });

  const [login] = useLoginMutation();

  const handleCredentials = (e: React.FormEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const stateErrors = {
      username: '',
      password: '',
    };
    let isFormValid = true;
    if (credentials.username.length < 2) {
      stateErrors.username = 'Username should have more than 6 chars!';
      isFormValid = false;
    }
    if (credentials.password.length < 2) {
      stateErrors.password = 'Password should have more than 6 chars!';
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
        username: '',
        password: '',
      };
      errors.forEach((error) => {
        const err = error.field as 'username' | 'password';
        stateErrors[err] = error.message;
      });
      return setCredentials({
        ...credentials,
        errors: stateErrors,
      });
    }
  };
  return (
    <AppWrapper width='wrapper-sm' textAlign='center'>
      <div className='auth-container mt-20'>
        <div className='text-left'>
          <AppLink
            href='/'
            type='small-link'
            textAlign='left'
            color='primary'
            bgColor='bg-primary'
            className='ml-3 mb-1'
          >
            <i className='fas fa-chevron-left'></i>
            Back
          </AppLink>
        </div>
        <AppFormCard>
          <h1 className='mb-7 text-light'>Login and start saving!</h1>
          <form onSubmit={onFormSubmit}>
            <AppInput
              placeholder='Username'
              id='login_username'
              name='username'
              handleInput={handleCredentials}
              value={credentials.username}
              type='text'
              errorText={credentials.errors.username}
              className='mb-3'
            />
            <AppInput
              placeholder='Password'
              id='login_password'
              name='password'
              handleInput={handleCredentials}
              value={credentials.password}
              type='password'
              errorText={credentials.errors.password}
              className='mb-3'
            />
            <AppButton type='submit' width='full' color='primary'>
              Login
            </AppButton>
          </form>
        </AppFormCard>
      </div>
    </AppWrapper>
  );
};

export default login;
