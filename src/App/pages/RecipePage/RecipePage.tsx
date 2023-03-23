import React from 'react';

import { WithLoader } from 'components/WithLoader';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import OneRecipeStore from 'store/OneRecipeStore';
import rootStore from 'store/RootStore';
import { useLocalStore } from 'utils/useLocalStore';

import RecipeContent from './components/RecipeContent';
import RecipePhoto from './components/RecipePhoto';
import styles from './RecipePage.module.scss';

const RecipePage: React.FC = () => {
  const id = Number(useParams().id);
  const recipeStore = useLocalStore(() => new OneRecipeStore(id, rootStore));
  const navigate = useNavigate();

  React.useEffect(() => {
    recipeStore.fetchRecipe(id);
  }, [id]);

  const recipe = recipeStore.recipe;
  const index = recipeStore.index;
  const maxIndex = recipeStore.maxIndex;

  const previous = () => {
    if (index !== null && index > 0) {
      navigate(
        `/recipe/${rootStore.recipes.recipes[index - 1].id}/${
          rootStore.query.URLParams
        }`
      );
    }
  };

  const next = () => {
    if (index !== null && index < maxIndex) {
      navigate(
        `/recipe/${rootStore.recipes.recipes[index + 1].id}/${
          rootStore.query.URLParams
        }`
      );
    }
  };

  if (recipe) {
    return (
      <div className={styles.page}>
        <div className={styles.recipe}>
          <RecipePhoto title={recipe.title} image={recipe.image} />
          <RecipeContent
            recipe={recipe}
            previous={previous}
            next={next}
            previousDisabled={index !== null && index > 0 ? false : true}
            nextDisabled={index !== null && index < maxIndex ? false : true}
          />
        </div>
      </div>
    );
  } else {
    return <WithLoader loading />;
  }
};

export default observer(RecipePage);
