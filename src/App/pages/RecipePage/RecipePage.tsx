import React from 'react';

import { WithLoader } from 'components/WithLoader';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import OneRecipeStore from 'store/OneRecipeStore';
import rootStore from 'store/RootStore';
import { useLocalStore } from 'utils/useLocalStore';

import RecipeContent from './components/RecipeContent';
import RecipePhoto from './components/RecipePhoto';
import styles from './RecipePage.module.scss';

const RecipePage: React.FC = () => {
  const navigate = useNavigate();
  const id = Number(useParams().id);
  const recipeStore = useLocalStore(() => new OneRecipeStore(id, rootStore));

  React.useEffect(() => {
    recipeStore.fetchRecipe(id);
  }, [id]);

  const recipe = recipeStore.recipe;

  const onClick = React.useCallback(() => navigate(-1), []);

  if (recipe) {
    return (
      <div className={styles.page}>
        <div className={styles.recipe}>
          <RecipePhoto
            title={recipe.title}
            image={recipe.image}
            onClick={onClick}
          />
          <RecipeContent recipe={recipe} />
        </div>
      </div>
    );
  } else {
    return <WithLoader loading />;
  }
};

export default observer(RecipePage);
