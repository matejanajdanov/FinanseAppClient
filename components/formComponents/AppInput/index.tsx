import React, { FC, InputHTMLAttributes } from "react";

import SmallError from "components/layout/AppSmallError";
import styles from "./index.module.scss";

interface InputComponent extends InputHTMLAttributes<HTMLInputElement> {
  handleInput: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  errorText?: string;
  label?: {
    text: string;
    className?: string;
  };
}

const InputComponent: FC<InputComponent> = ({
  handleInput,
  placeholder,
  className,
  errorText,
  id,
  label,
  value,
  name,
  type,
  ...props
}) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className={`${styles["form-label"]} ${
            label.className ? label.className : ""
          } `}
        >
          {label.text}
        </label>
      )}

      <input
        {...props}
        id={id}
        type={type ? type : "text"}
        className={`${styles["form-input"]} ${className ? className : ""}`}
        placeholder={placeholder}
        onChange={handleInput}
        value={value}
        name={name}
      />

      {errorText && <SmallError text={errorText} />}
    </>
  );
};

export default InputComponent;
