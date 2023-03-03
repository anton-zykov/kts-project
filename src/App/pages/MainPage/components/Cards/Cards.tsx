import { Card } from '@components/Card';
import { WithLoader } from '@components/WithLoader';
import { recipe } from '@store/models';
import RootStore from '@store/RootStore';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './Cards.module.scss';

export type CardsProps = {
  recipes: recipe[];
  handleScroll: VoidFunction;
  click: (id: number) => void;
};

export type nutrient = {
  name: string;
};

const Cards: React.FC<CardsProps> = ({ recipes, handleScroll, click }) => {
  const loading = RootStore.recipes.meta === 'loading' ? true : false;

  // Создается строка ингредиентов, разделённых плюсами.
  const getIngredients = (recipe: recipe): string => {
    return recipe.extendedIngredients
      .reduce(
        (ingredients: string, current: { name: string }) =>
          ingredients.concat(`${current.name} + `),
        ''
      )
      .slice(0, -3); // Обрезается последний пробел и плюс.
  };

  const getCalories = (recipe: recipe): number => {
    return Math.round(
      recipe.nutrition.nutrients.find(
        (nutrient: nutrient) => nutrient.name === 'Calories'
      ).amount
    );
  };

  /* Без пробела в WithLoader страница ведет себя странно,
  появляется вертикальная прокрутка, которая постоянно то исчезает,
  то снова появляется. Пробовал менять размер контейнера, не помогает. */
  return (
    <InfiniteScroll
      dataLength={recipes.length}
      next={handleScroll}
      hasMore={true}
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
            onClick={() => click(recipe.id)}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default observer(Cards);
