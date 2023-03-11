import React from 'react';

import parse from 'html-react-parser';
import { Recipe } from 'store/models';

import styles from './RecipeContent.module.scss';
import { getInstructions, updateLinks } from './utils';

export type RecipeContentProps = {
  recipe: Recipe;
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
            {recipe.aggregateLikes} Likes
          </span>
        </div>
      </div>
      <div className={styles.recipe__summary}>
        {parse(updateLinks(recipe.summary))}
      </div>
      <div className={styles.recipe__ingredients}>
        <ul>
          {recipe.extendedIngredients.map((ingr) => (
            <li key={ingr.original}>{ingr.original}</li>
          ))}
        </ul>
      </div>
      <div className={styles.recipe__instructions}>
        <ol>
          {getInstructions(recipe).map((instr, index) => (
            <li key={index}>{instr}</li>
          ))}
        </ol>
      </div>
    </div>
  );
});

export default RecipeContent;
