import React from 'react';

import classNames from 'classnames';

import styles from './Button.module.scss';

export type ButtonProps = React.PropsWithChildren<{
  children?: string;
  className?: string;
  onClick?: React.MouseEventHandler;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = React.memo(
  ({ children, className, onClick }) => {
    const btnClass = classNames(styles.button, className);

    return (
      <button className={btnClass} onClick={onClick}>
        {children}
      </button>
    );
  }
);
