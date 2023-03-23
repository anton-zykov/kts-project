import React from 'react';

import { Button } from 'components/Button';
import { useNavigate } from 'react-router-dom';
import rootStore from 'store/RootStore/instance';

import styles from './RecipePhoto.module.scss';

export type RecipePhotoProps = {
  title: string;
  image: string;
};

const RecipePhoto: React.FC<RecipePhotoProps> = React.memo(
  ({ title, image }) => {
    const navigate = useNavigate();

    const onClickBack = () => navigate(-1);
    const onClickHome = () => navigate(`/${rootStore.query.URLParams}`);

    return (
      <div className={styles.recipe__imageContainer}>
        <img
          className={styles.recipe__image}
          src={image}
          alt={`Image of ${title}`}
        />
        <Button className={styles.recipe__backButton} onClick={onClickBack} />
        <Button className={styles.recipe__homeButton} onClick={onClickHome} />
      </div>
    );
  }
);

export default RecipePhoto;
