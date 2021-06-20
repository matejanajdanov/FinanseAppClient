import React, { FC } from "react";
import styles from "../../../styles/components/utills/formComponents/ButtonComponent.module.scss";

interface ButtonComponentInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: "primary" | "secondary";
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
