import React from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Recipe } from 'store/models';
import rootStore from 'store/RootStore';

import Cards from './components/Cards';
import CategoriesFilter from './components/CategoriesFilter';
import Search from './components/Search';
import styles from './MainPage.module.scss';

let firstRender: boolean = true;

const MainPage: React.FC = () => {
  const recipes: Recipe[] = rootStore.recipes.recipes;
  const navigate = useNavigate();

  /* Через useEffect в devmode будет две загрузки,
  поэтому раз мы всё равно не делаем build, то думаю,
  можно таким костылём воспользоваться, чтобы не жечь
  токен, который и так мало запросов даёт. */
  if (recipes.length === 0 && firstRender) {
    firstRender = false;
    rootStore.recipes.fetchRecipes();
  }

  const handleScroll = async () => {
    await rootStore.recipes.fetchRecipes();
    const url = new URL(window.location.href);
    url.searchParams.set('count', String(rootStore.recipes.recipes.length));
    window.history.pushState(null, '', url.toString());
  };

  const handleClick = React.useCallback((id: number) => {
    navigate(`/recipe/${id}`);
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
