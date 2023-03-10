import { recipe } from 'store/models';

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
      (nutrient: { name: string }) => nutrient.name === 'Calories'
    ).amount
  );
};

export { getIngredients, getCalories };
