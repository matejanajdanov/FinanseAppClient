import React, { FC } from "react";

import styles from "./index.module.scss";

interface AppFormCardProps {
  className?: string;
}

const AppFormCard: FC<AppFormCardProps> = ({ children, className }) => {
  return <div className={`${styles["card"]} ${className}`}>{children}</div>;
};

export default AppFormCard;
