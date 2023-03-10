import React from 'react';

import { Card } from 'components/Card';
import { WithLoader } from 'components/WithLoader';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';
import { recipe } from 'store/models';
import RootStore from 'store/RootStore';

import styles from './Cards.module.scss';
import { getCalories, getIngredients } from './utils';

export type CardsProps = {
  recipes: recipe[];
  handleScroll: VoidFunction;
  onClick: (id: number) => void;
};

const Cards: React.FC<CardsProps> = ({ recipes, handleScroll, onClick }) => {
  const loading = RootStore.recipes.meta === 'loading' ? true : false;
  const areThereMoreRecipes = RootStore.recipes.maxRecipes > recipes.length;

  /* Без пробела в WithLoader страница ведет себя странно,
  появляется вертикальная прокрутка, которая постоянно то исчезает,
  то снова появляется. Пробовал менять размер контейнера, не помогает. */
  return (
    <InfiniteScroll
      dataLength={recipes.length}
      next={handleScroll}
      hasMore={areThereMoreRecipes}
      loader={<WithLoader loading={loading}>⠀</WithLoader>}
    >
      <div className={styles.main__content}>
        {recipes?.map((recipe) => (
          <Card
            key={recipe.id}
            image={recipe.image}
            title={recipe.title}
            subtitle={getIngredients(recipe)}
            kcal={getCalories(recipe)}
            onClick={() => onClick(recipe.id)}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default observer(Cards);
