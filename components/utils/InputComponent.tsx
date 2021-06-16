import React, { FC, InputHTMLAttributes } from "react";

interface InputComponent extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  handleInput: (e: React.FormEvent<HTMLInputElement>) => void;
  id?: string;
  className?: string;
  label?: {
    text: string;
    className?: string;
  };
}

const InputComponent: FC<InputComponent> = ({
  placeholder,
  handleInput,
  id,
  className,
  label,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className={label.className}>
          {label.text}
        </label>
      )}

      <input
        id={id}
        className={className}
        placeholder={placeholder}
        onChange={handleInput}
      />
    </>
  );
};

export default InputComponent;
