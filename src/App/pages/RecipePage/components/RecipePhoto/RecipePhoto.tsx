import React from 'react';

import { Button } from 'components/Button';
import { RecipeModel } from 'store/models';

import styles from './RecipePhoto.module.scss';

export type RecipePhotoProps = {
  title: string;
  image: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const RecipePhoto: React.FC<RecipePhotoProps> = React.memo(
  ({ title, image, onClick }) => {
    return (
      <div className={styles.recipe__imageContainer}>
        <img
          className={styles.recipe__image}
          src={image}
          alt={`Image of ${title}`}
        />
        <Button className={styles.recipe__backButton} onClick={onClick} />
      </div>
    );
  }
);

export default RecipePhoto;
