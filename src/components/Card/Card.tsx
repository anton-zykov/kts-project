import React from 'react';

import styles from './Card.module.scss';

export type CardProps = {
  image: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  kcal?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

export const Card: React.FC<CardProps> = React.memo(
  ({ image, title, subtitle, kcal, onClick }) => {
    return (
      <div className={styles.card} onClick={onClick}>
        <img className={styles.card__image} src={image} alt={'Recipe Photo'} />
        <div className={styles.card__title}>{title}</div>
        <div className={styles.card__subtitle}>{subtitle}</div>
        <div className={styles.card__caloriesMoreBox}>
          <div className={styles.card__calories}>{kcal} kcal</div>
          <div className={styles.card__more} />
        </div>
      </div>
    );
  }
);
