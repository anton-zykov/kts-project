import React from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RecipeModel } from 'store/models';
import rootStore from 'store/RootStore';

import Cards from './components/Cards';
import CategoriesFilter from './components/CategoriesFilter';
import Search from './components/Search';
import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  const recipes: RecipeModel[] = rootStore.recipes.recipes;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    if (recipes.length === 0) {
      rootStore.recipes.fetchRecipes();
    }
  }, []);

  const handleScroll = async () => {
    await rootStore.recipes.fetchRecipes();
    const params: { search?: string; count: string } = {
      count: String(rootStore.recipes.recipes.length),
    };
    const search = rootStore.query.getParam('search');
    if (search) params['search'] = search;
    setSearchParams(params, { replace: true });
  };

  const handleClick = React.useCallback((id: number) => {
    const search = rootStore.query.getParam('search');
    if (search) navigate(`/recipe/${id}/?search=${search}`);
    else navigate(`/recipe/${id}`);
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
