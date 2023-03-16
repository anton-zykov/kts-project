import React from 'react';

import { RecipeModel } from 'store/models';

import styles from './RecipeContent.module.scss';

export type RecipeContentProps = {
  recipe: RecipeModel;
};

const RecipeContent: React.FC<RecipeContentProps> = React.memo(({ recipe }) => {
  return (
    <div className={styles.recipe__contentContainer}>
      <div className={styles.recipe__scroll} />
      <div className={styles.recipe__title}>{recipe.title}</div>
      <div className={styles.recipe__timeRating}>
        <div className={styles.recipe__time}>
          <img src="/time.svg" alt="cooking time" />
          <span className={styles.recipe__timeRatingText}>
            {recipe.readyInMinutes} minutes
          </span>
        </div>
        <div className={styles.recipe__rating}>
          <img src="/like.svg" alt="likes" />
          <span className={styles.recipe__timeRatingText}>
            {recipe.likes} Likes
          </span>
        </div>
      </div>
      <div className={styles.recipe__summary}>{recipe.summary}</div>
      <div className={styles.recipe__ingredients}>
        <ul>
          {recipe.ingredients.map((ingr) => (
            <li key={ingr}>{ingr}</li>
          ))}
        </ul>
      </div>
      <div className={styles.recipe__instructions}>
        <ol>
          {recipe.instructions.map((instr, index) => (
            <li key={index}>{instr}</li>
          ))}
        </ol>
      </div>
    </div>
  );
});

export default RecipeContent;
