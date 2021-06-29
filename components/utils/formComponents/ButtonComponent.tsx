import React, { FC } from "react";
import styles from "../../../styles/components/utills/formComponents/ButtonComponent.module.scss";

type ClassName = string & { className?: any };

interface ButtonComponentInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: "primary" | "secondary" | ClassName;
  text: string;
}

const ButtonComponent: FC<ButtonComponentInterface> = ({
  text,
  className,
  ...props
}) => {
  return (
    <>
      <button
        {...props}
        className={`${styles["button"]} ${className ? className : ""}`}
      >
        {text}
      </button>
    </>
  );
};

export default ButtonComponent;
