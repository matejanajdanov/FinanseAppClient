import React, { FC } from "react";

import styles from "./index.module.scss";

const AppFormCard: FC = ({ children }) => {
  return <div className={styles["card"]}>{children}</div>;
};

export default AppFormCard;
