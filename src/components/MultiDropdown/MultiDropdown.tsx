import React from 'react';

import styles from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    return () => setExpanded(false);
  }, [disabled]);

  const ifSelected = (opt: Option): string => {
    return value.some((e) => e.key === opt.key) ? 'selected' : 'not-selected';
  };

  const handleChange = (opt: Option): void => {
    if (ifSelected(opt) === 'selected') {
      onChange(value.filter((e) => e.key !== opt.key));
    } else {
      onChange(value.concat(opt));
    }
  };

  return (
    <div className={styles.multiDropdown}>
      <div
        className={
          disabled
            ? styles.multiDropdown__header_disabled
            : styles.multiDropdown__header
        }
        onClick={() => setExpanded(disabled ? false : !expanded)}
      >
        {pluralizeOptions(value)}
      </div>
      {expanded &&
        options.map((opt) => (
          <div
            key={opt.key}
            className={ifSelected(opt)}
            onClick={(event) => handleChange(opt)}
          >
            {opt.value}
          </div>
        ))}
    </div>
  );
};
