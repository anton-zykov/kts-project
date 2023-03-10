import React from 'react';

import { Button } from 'components/Button';
import { recipe } from 'store/models';

import styles from './RecipePhoto.module.scss';

export type RecipePhotoProps = {
  recipe: recipe;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const RecipePhoto: React.FC<RecipePhotoProps> = React.memo(
  ({ recipe, onClick }) => {
    return (
      <div className={styles.recipe__imageContainer}>
        <img
          className={styles.recipe__image}
          src={recipe.image}
          alt={`Image of ${recipe.title}`}
        />
        <Button className={styles.recipe__backButton} onClick={onClick} />
      </div>
    );
  }
);

export default RecipePhoto;
