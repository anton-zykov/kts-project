import React from 'react';

import { CardSkeleton } from 'components/CardSkeleton/CardSkeleton';
import { WithLoader } from 'components/WithLoader';
import { BASECOUNT } from 'config/constants';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { RecipeModel } from 'store/models';
import rootStore from 'store/RootStore';
import { Meta } from 'utils/types';

import { Card } from './Card';
import styles from './Cards.module.scss';

const Cards: React.FC = () => {
  const recipes: RecipeModel[] = rootStore.recipes.recipes;
  const loading = rootStore.recipes.meta === 'loading' ? true : false;
  const areThereMoreRecipes = rootStore.recipes.maxRecipes > recipes.length;
  const navigate = useNavigate();

  const handleScroll = React.useCallback(async () => {
    await rootStore.recipes.fetchRecipes();
    rootStore.query.setCount(rootStore.recipes.recipes.length);

    navigate(rootStore.query.URLParams);
  }, []);

  return (
    <InfiniteScroll
      dataLength={recipes.length}
      next={handleScroll}
      hasMore={areThereMoreRecipes}
      loader={<WithLoader loading={loading}>⠀</WithLoader>}
    >
      <div className={styles.main__content}>
        {loading &&
          rootStore.recipes.recipes.length === 0 &&
          new Array(BASECOUNT)
            .fill(null)
            .map((v, index) => <CardSkeleton key={index} />)}
        {(rootStore.recipes.meta === Meta.success ||
          rootStore.recipes.recipes.length > 0) &&
          recipes?.map((recipe) => <Card key={recipe.id} recipe={recipe} />)}
        {rootStore.recipes.meta === Meta.success &&
          rootStore.recipes.recipes.length === 0 &&
          rootStore.query.getParam('search') && (
          <div>Sorry, no results found! You should probably specify your search.</div>)}
      </div>
    </InfiniteScroll>
  );
};

export default observer(Cards);
