import React from 'react';

import { MealType } from 'utils/types';

import styles from './MultiDropdown.module.scss';

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  mealTypes: MealType[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: MealType[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: MealType[]) => void;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: MealType[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  mealTypes,
  value,
  onChange,
  pluralizeOptions,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  // Функция для эффекта, закрывающего дропдаун при клике куда-то в сторону.
  const handleSideClick = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest('#multidropdown'))
      setExpanded(false);
  };

  React.useEffect(() => {
    if (expanded) document.addEventListener('click', handleSideClick);
    else document.removeEventListener('click', handleSideClick);
  }, [expanded]);

  const ifSelected = (mt: MealType): string => {
    return value.some((e) => e.key === mt.key)
      ? 'multiDropdown__selected'
      : 'multiDropdown__not-selected';
  };

  const handleChange = (mt: MealType): void => {
    if (ifSelected(mt) === 'multiDropdown__selected')
      onChange(value.filter((e) => e.key !== mt.key));
    else onChange(value.concat(mt));
  };

  return (
    <div className={styles.multiDropdown} id="multidropdown">
      <div
        className={styles.multiDropdown__header}
        onClick={() => setExpanded(!expanded)}
      >
        {pluralizeOptions(value) || 'Select Dish Categories'}
      </div>
      {expanded &&
        mealTypes.map((mt: MealType) => (
          <div
            key={mt.key}
            className={styles[ifSelected(mt)]}
            onClick={() => handleChange(mt)}
          >
            {mt.value}
          </div>
        ))}
    </div>
  );
};
