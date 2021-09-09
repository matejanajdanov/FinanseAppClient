import Link, { LinkProps } from 'next/link';
import React, { FC } from 'react';

import styles from './index.module.scss';

interface AppLinkProps extends LinkProps {
  bgColor?: 'bg-primary' | 'bg-light' | 'bg-dark';
  textAlign?: 'left' | 'center' | 'right';
  color?: 'primary' | 'light' | 'dark';
  type?: 'button-link' | 'small-link';
  linkClick?: (e: any) => void;
  width?: 'full' | 'small';
  className?: string;
}

const AppLink: FC<AppLinkProps> = ({
  type = 'button-link',
  textAlign = 'left',
  color = 'primary',
  width = 'small',
  bgColor = 'bg-dark',
  className = '',
  linkClick,
  children,
  ...props
}) => {
  return (
    <Link {...props}>
      <a
        onClick={linkClick}
        className={`${styles[type]} ${styles[width]} ${styles[textAlign]} ${styles[color]} ${styles[bgColor]} ${className}`}
      >
        {children}
      </a>
    </Link>
  );
};

export default AppLink;
