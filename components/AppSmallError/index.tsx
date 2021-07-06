import React, { FC } from "react";

import styles from "./SmallError.module.scss";

interface ResponseError {
  text: string;
  className?: string;
}

const ResponseError: FC<ResponseError> = ({ text, className }) => {
  return (
    <p className={`${styles["small-error"]} ${className ? className : ""}`}>
      {text}
    </p>
  );
};

export default ResponseError;
