import React, { FC, InputHTMLAttributes } from "react";
import SmallError from "../SmallError";
import styles from "../../../styles/components/utills/formComponents/InputComponent.module.scss";

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
  className,
  placeholder,
  id,
  label,
  value,
  name,
  errorText,
  ...props
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className={styles["form-label"]}>
          {label.text}
        </label>
      )}

      <input
        {...props}
        id={id}
        className={`${styles["form-input"]} ${
          styles[className ? className : ""]
        }`}
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
