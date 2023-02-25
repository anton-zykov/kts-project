import parse from 'html-react-parser';

import styles from './RecipeContent.module.scss';
import { recipe } from '../../RecipePage';

export type RecipeContentProps = {
  recipe: recipe;
};

const RecipeContent: React.FC<RecipeContentProps> = ({ recipe }) => {
  const updateLinks = (summary: string): string => {
    const regex = /https:\/\/spoonacular\.com\/recipes\/\D+/g;
    return summary.replaceAll(regex, '/recipe/');
  };

  return (
    <div className={styles.recipe__contentContainer}>
      <div className={styles.recipe__scroll} />
      <div className={styles.recipe__title}>{recipe.title}</div>
      <div className={styles.recipe__timeRating}>
        <div className={styles.recipe__time}>
          <img src="/time.png" alt="cooking time" />
          <span className={styles.recipe__timeRatingText}>
            {recipe.readyInMinutes} minutes
          </span>
        </div>
        <div className={styles.recipe__rating}>
          <img src="/like.png" alt="likes" />
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
        {parse(recipe.instructions)}
      </div>
    </div>
  );
};

export default RecipeContent;
