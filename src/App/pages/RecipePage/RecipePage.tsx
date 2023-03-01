import { useEffect } from 'react';

import { WithLoader } from '@components/WithLoader';
import { getOneRecipe } from '@services/recipes';
import OneRecipeStore from '@store/OneRecipeStore';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';

import RecipeContent from './components/RecipeContent';
import RecipePhoto from './components/RecipePhoto';
import styles from './RecipePage.module.scss';

const RecipePage: React.FC = () => {
  const id = Number(useParams().id);
  const store = useLocalObservable(() => new OneRecipeStore());
  const recipe = store.recipe;
  const navigate = useNavigate();

  useEffect(() => {
    getOneRecipe(id)
      .then((data) => {
        store.setRecipe(data);
      })
      .catch((e) => {
        alert(e.message);
      });
  }, [id, store]);

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
