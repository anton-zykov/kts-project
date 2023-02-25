import React from 'react';

import styles from './CheckBox.module.scss';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onChange,
  disabled,
  ...props
}) => {
  return (
    <input
      className={styles.checkbox}
      type="checkbox"
      disabled={disabled}
      checked={checked}
      onClick={disabled ? () => {} : () => onChange(!checked as boolean)}
      {...props}
    />
  );
};
