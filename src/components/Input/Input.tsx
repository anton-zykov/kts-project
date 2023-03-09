import React from 'react';

import classNames from 'classnames';

import styles from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  value: string;
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  ...props
}) => {
  const inputClass = classNames(styles.input, className);

  return (
    <input
      type="text"
      className={inputClass}
      onChange={(event) => onChange(event.target.value)}
      value={value}
      {...props}
    />
  );
};
