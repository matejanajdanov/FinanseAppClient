import { useCurrentUserQuery } from 'generated/generate';
import React from 'react';

import { AppLink, AppNavbar, AppWrapper } from 'components';
import styles from 'styles/pages/index.module.scss';

const renderBody = () => {
  const { data } = useCurrentUserQuery();
  if (data?.currentUser?.profile) {
    return (
      <h2>
        Welcome {data.currentUser.profile.firstName}{' '}
        {data.currentUser.profile.lastName}!
      </h2>
    );
  }
  if (data?.currentUser) {
    return (
      <h2>
        Welcome {data.currentUser.username}, thanks for signing in, but we will
        need a bit more information so please go to
        <br />
        <AppLink
          href='/profile/createProfile'
          type='button-link'
          bgColor='bg-dark'
          color='light'
          className='mt-5 mb-5 d-inline-block'
        >
          Create profile
        </AppLink>{' '}
        <br />
        and create a profile!
      </h2>
    );
  }
  return (
    <>
      <AppLink href='/auth/login' color='light' bgColor='bg-dark'>
        Login
      </AppLink>
      <AppLink href='/auth/register' color='light' bgColor='bg-dark'>
        Register
      </AppLink>
    </>
  );
};

const index = () => {
  const { data } = useCurrentUserQuery();
  return (
    <>
      {data?.currentUser && <AppNavbar />}
      <div className={`${styles['index-page']} mt-15`}>
        <AppWrapper textAlign='center'>
          <h1>Welcome to best expense tracker!</h1>
          <h2 className='mt-10'>
            Gather all your expenses and incomes in one place, keep your life
            organized :)
          </h2>
          <div className={`${styles['buttons']} mt-10`}>{renderBody()}</div>
        </AppWrapper>
      </div>
    </>
  );
};

export default index;
