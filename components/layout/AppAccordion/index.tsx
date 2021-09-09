import React, { FC, useEffect, useRef, useState } from 'react';

import styles from './index.module.scss';

interface AccordionProps {
  accordionClass?: string;
  buttonClass?: string;
  text: string;
}

const Accordion: FC<AccordionProps> = ({
  accordionClass = '',
  buttonClass,
  children,
  text,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [accordionHeight, setAccordionHeight] = useState(0);

  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    accordionRef.current?.scrollHeight &&
      setAccordionHeight(accordionRef.current?.scrollHeight);
  }, [accordionRef.current?.scrollHeight]);

  return (
    <div>
      <button
        onClick={(e) => setIsActive(!isActive)}
        className={`${styles['accordion']} ${buttonClass}`}
      >
        {text}
      </button>
      <div
        ref={accordionRef}
        style={isActive ? { maxHeight: accordionHeight } : { maxHeight: 0 }}
        className={`${styles['panel']} ${
          isActive ? styles['panel-active'] : ''
        } ${accordionClass}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
