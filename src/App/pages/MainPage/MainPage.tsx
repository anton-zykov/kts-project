import React from 'react';

import { observer } from 'mobx-react-lite';
import { RecipeModel } from 'store/models';
import rootStore from 'store/RootStore';

import Cards from './components/Cards';
import CategoriesFilter from './components/CategoriesFilter';
import Search from './components/Search';
import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  const recipes: RecipeModel[] = rootStore.recipes.recipes;

  const initialFetch = () => {
    if (recipes.length === 0) {
      rootStore.recipes.fetchRecipes();
    }
  };

  React.useEffect(initialFetch, []);

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Search />
        <CategoriesFilter />
        <Cards />
      </div>
    </div>
  );
};

export default observer(MainPage);
