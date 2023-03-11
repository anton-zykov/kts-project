import React from 'react';
import { useEffect, useState } from 'react';

import { WithLoader } from 'components/WithLoader';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneRecipe } from 'services/recipes';
import { Recipe } from 'store/models';
import rootStore from 'store/RootStore';

import RecipeContent from './components/RecipeContent';
import RecipePhoto from './components/RecipePhoto';
import styles from './RecipePage.module.scss';

const RecipePage: React.FC = () => {
  const navigate = useNavigate();
  const id = Number(useParams().id);
  const [recipe, setRecipe] = useState<null | Recipe>(null);

  const fetchRecipe = (id: number): void => {
    getOneRecipe(id)
      .then(setRecipe)
      .catch((e) => {
        alert(e.message);
      });
  };
  // Сначала проверяем, есть ли рецепт в основном сторе. При переходе с главной так и будет.
  const recipeInGlobalStore = rootStore.recipes.recipes.filter(
    (r) => r.id === id
  );

  useEffect(() => {
    if (recipeInGlobalStore.length > 0) {
      setRecipe(recipeInGlobalStore[0]);
    } else {
      fetchRecipe(id);
    }
  }, []);

  if (recipe) {
    return (
      <div className={styles.page}>
        <div className={styles.recipe}>
          <RecipePhoto recipe={recipe} onClick={() => navigate(-1)} />
          <RecipeContent recipe={recipe} />
        </div>
      </div>
    );
  } else {
    return <WithLoader loading />;
  }
};

export default observer(RecipePage);
