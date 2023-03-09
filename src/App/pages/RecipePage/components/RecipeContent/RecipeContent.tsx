import React from 'react';

import parse from 'html-react-parser';
import { recipe } from 'store/models';

import styles from './RecipeContent.module.scss';

export type RecipeContentProps = {
  recipe: recipe;
};

const RecipeContent: React.FC<RecipeContentProps> = ({ recipe }) => {
  const updateLinks = (summary: string): string => {
    const regex = /https:\/\/spoonacular\.com\/recipes\/\D+/g;
    return summary.replaceAll(regex, '/recipe/');
  };

  /* Получение списка инструкций из сложного объекта, присланного api.
  Пришлось изменить подход на более некрасивый по сравнению с дз3,
  чтобы не делать новые запросы для рецептов, которые были на главной странице.
  У них не получается запросить поле instructions, а можно только такое.
  Зато теперь можно пользоваться глобальным стором и в большинстве случаев
  не пользоваться сетью. */
  const getInstructions = (): string[] => {
    return recipe.analyzedInstructions[0].steps.reduce(
      (result: string[], current: { step: string }) => {
        return result.concat(current.step);
      },
      []
    );
  };

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
          {getInstructions().map((instr, index) => (
            <li key={index}>{instr}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeContent;
