import { Card } from '@components/Card';
import { WithLoader } from '@components/WithLoader';
import { recipe } from '@store/models';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './Cards.module.scss';

export type CardsProps = {
  recipes: recipe[];
  fetchRecipes: VoidFunction;
  click: (id: number) => void;
};

export type nutrient = {
  name: string;
};

const Cards: React.FC<CardsProps> = ({ recipes, fetchRecipes, click }) => {
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

  return (
    <InfiniteScroll
      dataLength={recipes.length}
      next={fetchRecipes}
      hasMore={true}
      loader={<WithLoader loading={true}>.</WithLoader>}
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

export default Cards;
