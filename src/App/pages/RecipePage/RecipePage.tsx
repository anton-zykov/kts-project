import { useEffect, useState } from 'react';

import { WithLoader } from '@components/WithLoader';
import { getOneRecipe } from '@services/recipes';
import { useParams, useNavigate } from 'react-router-dom';

import RecipeContent from './components/RecipeContent';
import RecipePhoto from './components/RecipePhoto';
import styles from './RecipePage.module.scss';

export type recipe = {
  title: string;
  instructions: string;
  summary: string;
  image: string;
  readyInMinutes: number;
  aggregateLikes: number;
  extendedIngredients: { original: string }[];
};

const RecipePage: React.FC = () => {
  const id = Number(useParams().id);
  const [recipe, setRecipe] = useState<null | recipe>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getOneRecipe(id)
      .then((data) => {
        setRecipe(data);
      })
      .catch((e) => {
        alert(e.message);
      });
  }, [id]);

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

export default RecipePage;
