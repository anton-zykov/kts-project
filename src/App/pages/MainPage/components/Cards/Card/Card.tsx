import React from 'react';

import { useNavigate } from 'react-router-dom';
import { RecipeModel } from 'store/models';
import rootStore from 'store/RootStore';

import styles from './Card.module.scss';

export type CardProps = {
  recipe: RecipeModel;
};

export const Card: React.FC<CardProps> = React.memo(({ recipe }) => {
  const navigate = useNavigate();
  const onClick = React.useCallback(() => {
    navigate(`/recipe/${recipe.id}/${rootStore.query.URLParams}`);
  }, []);

  return (
    <div className={styles.card} onClick={onClick}>
      <img
        className={styles.card__image}
        src={recipe.image}
        alt={'Recipe Photo'}
      />
      <div className={styles.card__title}>{recipe.title}</div>
      <div className={styles.card__subtitle}>{recipe.allIngredientsLine}</div>
      <div className={styles.card__caloriesTimeBox}>
        <div className={styles.card__calories}>{recipe.calories} kcal</div>
        <div className={styles.card__time}>~{recipe.readyInMinutes} min</div>
      </div>
    </div>
  );
});
