import React, { useCallback } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { RecipeModel } from 'store/models';
import rootStore from 'store/RootStore';

import Cards from './components/Cards';
import CategoriesFilter from './components/CategoriesFilter';
import Search from './components/Search';
import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  const recipes: RecipeModel[] = rootStore.recipes.recipes;
  const navigate = useNavigate();

  const initialFetch = React.useCallback(() => {
    if (recipes.length === 0) {
      rootStore.recipes.fetchRecipes();
    }
  }, []);

  React.useEffect(initialFetch, [initialFetch]);

  const handleScroll = React.useCallback(async () => {
    await rootStore.recipes.fetchRecipes();
    rootStore.query.setCount(rootStore.recipes.recipes.length);

    navigate(rootStore.query.getURLParams());
  }, []);

  const handleClick = React.useCallback((id: number) => {
    navigate(`/recipe/${id}/${rootStore.query.getURLParams()}`);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Search />
        <CategoriesFilter />
        <Cards
          recipes={recipes}
          handleScroll={handleScroll}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default observer(MainPage);
