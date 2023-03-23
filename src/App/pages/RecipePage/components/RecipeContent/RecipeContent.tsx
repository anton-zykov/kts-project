import React from 'react';

import { Button } from 'components/Button';
import { RecipeModel } from 'store/models';

import styles from './RecipeContent.module.scss';

export type RecipeContentProps = {
  recipe: RecipeModel;
  previous: VoidFunction;
  next: VoidFunction;
  previousDisabled: boolean;
  nextDisabled: boolean;
};

const RecipeContent: React.FC<RecipeContentProps> = React.memo(
  ({ recipe, previous, next, previousDisabled, nextDisabled }) => {
    return (
      <div className={styles.recipe__contentContainer}>
        <div className={styles.recipe__pagesNavigation}>
          <Button
            className={styles.recipe__previous}
            onClick={previous}
            disabled={previousDisabled}
          />
          <div className={styles.recipe__title}>{recipe.title}</div>
          <Button
            className={styles.recipe__next}
            onClick={next}
            disabled={nextDisabled}
          />
        </div>
        <div className={styles.recipe__timeRating}>
          <div className={styles.recipe__time}>
            <div className={styles.recipe__timeIcon} />
            <span className={styles.recipe__timeRatingText}>
              {recipe.readyInMinutes} minutes
            </span>
          </div>
          <div className={styles.recipe__rating}>
            <div className={styles.recipe__ratingIcon} />
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
  }
);

export default RecipeContent;
