import { useEffect } from 'react';

import { getTenRecipes } from '@services/recipes';
import RootStore from '@store/RootStore';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import Cards from './components/Cards';
import CategoriesFilter from './components/CategoriesFilter';
import Search from './components/Search';
import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  const store = useLocalObservable(() => new RootStore());
  const recipes = store.recipes;
  const navigate = useNavigate();

  const fetchRecipes = () => {
    getTenRecipes(recipes.length)
      .then((data) => {
        store.setRecipes(recipes.concat(data.results));
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

export default observer(MainPage);
