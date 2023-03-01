import React from 'react';

import styles from './Card.module.scss';

export type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle: React.ReactNode;
  /** Количество калорий */
  kcal?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

export const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  kcal,
  onClick,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img className={styles.card__image} src={image} alt={title as string} />
      <div className={styles.card__title}>{title}</div>
      <div className={styles.card__subtitle}>{subtitle}</div>
      <div className={styles.card__caloriesMore}>
        <div className={styles.card__calories}>{kcal} kcal</div>
        <div className={styles.card__more} />
      </div>
    </div>
  );
};
