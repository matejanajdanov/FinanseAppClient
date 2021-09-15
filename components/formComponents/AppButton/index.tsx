import React, { FC } from 'react';

import styles from './index.module.scss';

interface ButtonComponentInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'light' | 'danger';
  width?: 'full' | 'small';
}

const ButtonComponent: FC<ButtonComponentInterface> = ({
  color = 'primary',
  width = 'full',
  className,
  children,
  ...props
}) => {
  return (
    <>
      <button
        {...props}
        className={`${styles['button']} ${styles[width]} ${styles[color]} ${
          className && className
        }`}
      >
        {children}
      </button>
    </>
  );
};

export default ButtonComponent;
