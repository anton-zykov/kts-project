import React from 'react';

import styles from './Button.module.scss';
import { Loader, LoaderSize } from '../Loader';

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  className,
  ...otherActions
}) => {
  return (
    <button
      className={`${styles.button} ${className} 
        ${loading || otherActions.disabled ? `${styles.button__disabled}` : ''}
        `}
      {...otherActions}
      disabled={loading || otherActions.disabled}
    >
      {loading && <Loader size={LoaderSize.s} />}
      <div>{children}</div>
    </button>
  );
};
