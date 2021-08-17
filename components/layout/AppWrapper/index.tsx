import React, { FC, ReactNode } from "react";

import styles from "./index.module.scss";

interface WrapperInterface {
  children: ReactNode;
  width?: "wrapper-lg" | "wrapper-md" | "wrapper-sm";
  textAlign?: "center" | "left" | "right";
  className?: string;
}

const Wrapper: FC<WrapperInterface> = ({
  width = "wrapper-md",
  textAlign = "left",
  className = "",
  children,
}) => {
  return (
    <div className={`${styles[width]} ${styles[textAlign]} ${className}`}>
      {children}
    </div>
  );
};

export default Wrapper;
