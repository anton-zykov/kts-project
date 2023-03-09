import React from 'react';

import { Button } from 'components/Button';
import { recipe } from 'store/models';

import styles from './RecipePhoto.module.scss';

export type RecipePhotoProps = {
  recipe: recipe;
  onClick: React.MouseEventHandler;
};

const RecipePhoto: React.FC<RecipePhotoProps> = ({ recipe, onClick }) => {
  return (
    <div className={styles.recipe__imageContainer}>
      <img
        className={styles.recipe__image}
        src={recipe.image}
        alt={`Изображение блюда ${recipe.title}`}
      />
      <Button className={styles.recipe__backButton} onClick={onClick} />
    </div>
  );
};

export default RecipePhoto;
