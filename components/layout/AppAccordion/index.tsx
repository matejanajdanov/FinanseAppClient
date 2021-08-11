import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";

import styles from "./index.module.scss";

interface AccordionProps {
  text: string;
  className?: string;
}

const Accordion: FC<AccordionProps> = ({ text, className, children }) => {
  const [isActive, setIsActive] = useState(false);
  const [accordionHeight, setAccordionHeight] = useState(0);

  const accordionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    accordionRef.current?.scrollHeight &&
      setAccordionHeight(accordionRef.current?.scrollHeight);
  }, []);

  return (
    <div>
      <button
        onClick={(e) => setIsActive(!isActive)}
        className={styles["accordion"]}
      >
        {text}
      </button>
      <div
        ref={accordionRef}
        style={isActive ? { maxHeight: accordionHeight } : { maxHeight: 0 }}
        className={`${styles["panel"]} ${
          isActive ? styles["panel-active"] : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
