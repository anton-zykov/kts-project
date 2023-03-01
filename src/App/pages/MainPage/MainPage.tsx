import { useEffect, useState } from 'react';

import { getTenRecipes } from '@services/recipes';
import { useNavigate } from 'react-router-dom';

import Cards from './components/Cards';
import CategoriesFilter from './components/CategoriesFilter';
import Search from './components/Search';
import styles from './MainPage.module.scss';

export type recipe = {
  title: string;
  id: number;
  image: string;
  missedIngredients: { name: string }[];
  nutrition: any;
};

const MainPage: React.FC = () => {
  const [recipes, setRecipes] = useState<recipe[]>([]);

  const navigate = useNavigate();

  const fetchRecipes = () => {
    getTenRecipes(recipes.length)
      .then((data) => {
        setRecipes(recipes.concat(data.results));
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  useEffect(fetchRecipes, []);

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Search />
        <CategoriesFilter />
        <Cards
          recipes={recipes}
          fetchRecipes={fetchRecipes}
          click={(id: number) => navigate(`/recipe/${id}`)}
        />
      </div>
    </div>
  );
};

export default MainPage;
