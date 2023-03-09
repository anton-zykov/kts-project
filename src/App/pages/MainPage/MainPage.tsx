import React from 'react';

import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import RootStore from 'store/RootStore';

import Cards from './components/Cards';
import CategoriesFilter from './components/CategoriesFilter';
import Search from './components/Search';
import styles from './MainPage.module.scss';

let firstRender: boolean = true;

const MainPage: React.FC = () => {
  const recipes = RootStore.recipes.recipes;
  const navigate = useNavigate();

  /* Через useEffect в devmode будет две загрузки,
  поэтому раз мы всё равно не делаем build, то думаю,
  можно таким костылём воспользоваться, чтобы не жечь
  токен, который и так мало запросов даёт. */
  if (recipes.length === 0 && firstRender) {
    firstRender = false;
    RootStore.recipes.fetchRecipes();
  }

  const handleScroll = async () => {
    await RootStore.recipes.fetchRecipes();
    const url = new URL(window.location.href);
    url.searchParams.set('count', String(RootStore.recipes.recipes.length));
    window.history.pushState(null, '', url.toString());
  };

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Search />
        <CategoriesFilter />
        <Cards
          recipes={recipes}
          handleScroll={handleScroll}
          click={(id: number) =>
            runInAction(() => {
              navigate(
                // eslint-disable-next-line prettier/prettier
                `/recipe/${id}/?search=${RootStore.query.getParam('search')}&count=${recipes.length}`
              );
            })
          }
        />
      </div>
    </div>
  );
};

export default observer(MainPage);
