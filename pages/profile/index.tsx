import { AppNavbar } from 'components';
import Wrapper from 'components/layout/AppWrapper';
import React, { useState } from 'react';

const index = () => {
  return (
    <div>
      <AppNavbar />
      <Wrapper width='wrapper-lg'>Some text</Wrapper>
    </div>
  );
};

export default index;
