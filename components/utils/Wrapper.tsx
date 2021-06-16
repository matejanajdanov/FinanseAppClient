import React, { FC, ReactNode } from "react";

interface WrapperInterface {
  children: ReactNode;
  className?: "wrapper-lg" | "wrapper-md" | "wrapper-sm";
}

const Wrapper: FC<WrapperInterface> = ({ className, children }) => {
  return <div className={className ? className : "wrapper-lg"}>{children}</div>;
};

export default Wrapper;
