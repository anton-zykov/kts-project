import { useEffect, useState } from 'react';

import { WithLoader } from '@components/WithLoader';
import { getOneRecipe } from '@services/recipes';
import { recipe } from '@store/models';
import RootStore from '@store/RootStore';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';

import RecipeContent from './components/RecipeContent';
import RecipePhoto from './components/RecipePhoto';
import styles from './RecipePage.module.scss';

const RecipePage: React.FC = () => {
  const navigate = useNavigate();
  const id = Number(useParams().id);
  const [recipe, setRecipe] = useState<null | recipe>(null);

  const fetchRecipe = (id: number): void => {
    getOneRecipe(id)
      .then(setRecipe)
      .catch((e) => {
        alert(e.message);
      });
  };

  const recipeInGlobalStore = RootStore.recipes.recipes.filter(
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
