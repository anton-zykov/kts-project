import RootStore from '@store/RootStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import Cards from './components/Cards';
import CategoriesFilter from './components/CategoriesFilter';
import Search from './components/Search';
import styles from './MainPage.module.scss';

let firstRender: boolean = true;

const MainPage: React.FC = () => {
  const store = RootStore.recipes;
  const recipes = store.recipes;
  const navigate = useNavigate();

  /* Через useEffect в devmode будет две загрузки,
  поэтому раз мы всё равно не делаем build, то думаю,
  можно таким костылём воспользоваться, чтобы не жечь
  токен, который и так мало запросов даёт. */
  if (recipes.length === 0 && firstRender) {
    firstRender = false;
    RootStore.recipes.fetchRecipes();
  }

  const handleScroll = () => {
    RootStore.recipes.fetchRecipes();
  };

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Search />
        <CategoriesFilter />
        <Cards
          recipes={recipes}
          handleScroll={handleScroll}
          click={(id: number) => navigate(`/recipe/${id}`)}
        />
      </div>
    </div>
  );
};

export default observer(MainPage);
