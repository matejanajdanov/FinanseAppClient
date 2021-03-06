import React, { FC } from 'react';

import styles from './index.module.scss';

interface ResponseError {
  className?: string;
  text: string;
}

const ResponseError: FC<ResponseError> = ({ text, className }) => {
  return (
    <p className={`${styles['small-error']} ${className ? className : ''}`}>
      {text}
    </p>
  );
};

export default ResponseError;
