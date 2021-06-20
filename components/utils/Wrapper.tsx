import React, { FC, ReactNode } from "react";
import styles from "../../styles/components/utills/Wrapper.module.scss"

interface WrapperInterface {
  children: ReactNode;
  className?: "wrapper-lg" | "wrapper-md" | "wrapper-sm";
}

const Wrapper: FC<WrapperInterface> = ({ className, children }) => {
  return <div className={className ? styles[className] : "wrapper-lg"}>{children}</div>;
};

export default Wrapper;
