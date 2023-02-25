import React from 'react';

import styles from './Card.module.scss';

export type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

export const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img className={styles.card__image} src={image} alt={title as string} />
      <div className={styles.card__title}>{title}</div>
      <div className={styles.card__subtitle}>{subtitle}</div>
      <div className={styles.card__caloriesMore}>
        <div className={styles.card__calories}>{content} kcal</div>
        <div className={styles.card__more} />
      </div>
    </div>
  );
};
