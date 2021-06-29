import React, { FC, ReactNode } from "react";
import styles from "../../styles/components/utills/Wrapper.module.scss";

type ClassName = string & { className?: any };

interface WrapperInterface {
  children: ReactNode;
  className?: "wrapper-lg" | "wrapper-md" | "wrapper-sm" | ClassName;
}

const Wrapper: FC<WrapperInterface> = ({ className, children }) => {
  return <div className={className ? className : "wrapper-lg"}>{children}</div>;
};

export default Wrapper;
