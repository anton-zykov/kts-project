import React from 'react';

import styles from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  disabled,
  ...props
}) => {
  return (
    <input
      type="text"
      className={`${styles.input} ${className} 
        ${disabled ? `${styles.input__disabled}` : ''}`}
      onChange={(event) => onChange(event.target.value as string)}
      value={value}
      disabled={disabled}
      {...props}
    />
  );
};
