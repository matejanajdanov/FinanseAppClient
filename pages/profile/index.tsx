import Wrapper from "components/layout/AppWrapper";
import React, { useState } from "react";

import Navbar from "sections/Navbar";

const index = () => {
  return (
    <div>
      <Navbar />
      <Wrapper width="wrapper-lg">Some text</Wrapper>
    </div>
  );
};

export default index;
