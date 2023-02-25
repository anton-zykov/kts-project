import { Button } from '@components/Button';

import styles from './RecipePhoto.module.scss';
import { recipe } from '../../RecipePage';

export type RecipePhotoProps = {
  recipe: recipe;
  click: () => void;
};

const RecipePhoto: React.FC<RecipePhotoProps> = ({ recipe, click }) => {
  return (
    <div className={styles.recipe__imageContainer}>
      <img
        className={styles.recipe__image}
        src={recipe.image}
        alt={`${recipe.title}`}
      />
      <Button className={styles.recipe__backButton} onClick={() => click()} />
    </div>
  );
};

export default RecipePhoto;
