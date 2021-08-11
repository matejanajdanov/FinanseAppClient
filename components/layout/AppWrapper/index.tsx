import React, { FC, ReactNode } from "react";

import styles from "./index.module.scss";

interface WrapperInterface {
  children: ReactNode;
  width?: "wrapper-lg" | "wrapper-md" | "wrapper-sm";
  textAlign?: "center" | "left" | "right";
}

const Wrapper: FC<WrapperInterface> = ({
  width = "wrapper-md",
  textAlign = "left",
  children,
}) => {
  return (
    <div className={`${styles[width]} ${styles[textAlign]}`}>{children}</div>
  );
};

export default Wrapper;
