import React, { SelectHTMLAttributes } from "react";

import styles from "./index.module.scss";

interface AppSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  handleInput?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { text: string; value: string; key: string }[];
  className?: string;
}

const AppSelect: React.FC<AppSelectProps> = ({
  className = "",
  handleInput,
  options,
  ...props
}) => {
  return (
    <select
      {...props}
      className={`${styles["form-select"]} ${className}`}
      onChange={handleInput}
    >
      {options.map((option) => {
        return (
          <option key={option.key} value={option.value}>
            {option.text}
          </option>
        );
      })}
    </select>
  );
};
export default AppSelect;
