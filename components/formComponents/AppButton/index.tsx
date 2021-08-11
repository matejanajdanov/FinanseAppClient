import React, { FC } from "react";

import styles from "./index.module.scss";

interface ButtonComponentInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "light";
  width?: "full" | "small";
  text: string;
}

const ButtonComponent: FC<ButtonComponentInterface> = ({
  color = "primary",
  width = "full",
  className,
  text,
  ...props
}) => {
  return (
    <>
      <button
        {...props}
        className={`${styles["button"]} ${styles[width]} ${styles[color]} ${
          className && className
        }`}
      >
        {text}
      </button>
    </>
  );
};

export default ButtonComponent;
