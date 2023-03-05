import { useEffect, useState } from 'react';

import { WithLoader } from '@components/WithLoader';
import { getOneRecipe } from '@services/recipes';
import { recipe } from '@store/models';
import RootStore from '@store/RootStore';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';

import RecipeContent from './components/RecipeContent';
import RecipePhoto from './components/RecipePhoto';
import styles from './RecipePage.module.scss';

const RecipePage: React.FC = () => {
  const navigate = useNavigate();
  const id = Number(useParams().id);
  /* Не переписывал на mobX, поскольку в большинстве случаев у этой страницы
  даже нет своих данных, а если и есть, то они не меняются, поэтому казалось
  бы это экономней с точки зрения ресурсов. */
  const [recipe, setRecipe] = useState<null | recipe>(null);

  const fetchRecipe = (id: number): void => {
    getOneRecipe(id)
      .then(setRecipe)
      .catch((e) => {
        alert(e.message);
      });
  };
  // Сначала проверяем, есть ли рецепт в основном сторе. При переходе с главной так и будет.
  const recipeInGlobalStore = RootStore.recipes.recipes.filter(
    (r) => r.id === id
  );

  useEffect(() => {
    if (recipeInGlobalStore.length > 0) {
      runInAction(() => setRecipe(recipeInGlobalStore[0]));
    } else {
      fetchRecipe(id);
    }
  }, []);

  if (recipe) {
    return (
      <div className={styles.page}>
        <div className={styles.recipe}>
          <RecipePhoto recipe={recipe} click={() => navigate(-1)} />
          <RecipeContent recipe={recipe} />
        </div>
      </div>
    );
  } else {
    return <WithLoader loading />;
  }
};

export default observer(RecipePage);
