import { AppFormCard } from 'components';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import React, { FC, useLayoutEffect, useRef } from 'react';

import styles from './index.module.scss';

interface AppModalProps {
  isDisplayed: boolean;
  closeModal: () => void;
  className?: string;
}

const AppModal: FC<AppModalProps> = ({
  isDisplayed,
  closeModal,
  className,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => {
    closeModal();
  });
  return (
    <div
      className={`${styles['modal']} ${className ? 'ff' : ''} c-modal`}
      style={isDisplayed ? { display: 'flex' } : { display: 'none' }}
    >
      <AppFormCard className={`modal-container ${styles['card']}`}>
        <div className={`${styles['modal-cross']} modal-cross`}>
          <i className='fas fa-times'></i>
        </div>
        <div className={styles['modal-content']} ref={modalRef}>
          {children}
        </div>
      </AppFormCard>
    </div>
  );
};

export default AppModal;
