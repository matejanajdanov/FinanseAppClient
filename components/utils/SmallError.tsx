import React, { FC } from "react";
import styles from "../../styles/components/utills/SmallError.module.scss";

interface ResponseError {
  text: string;
  className?: string;
}

const ResponseError: FC<ResponseError> = ({ text, className }) => {
  return <p className={styles["small-error"]}>{text}</p>;
};

export default ResponseError;
