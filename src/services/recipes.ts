import axios from 'axios';
import { MealType } from 'utils/types';

const apiKey: string = '55f1c4089ef4436ba921d637e72b3053';
const apiKey1: string = 'a0b450164ebb4fff8a2765b6dd37ad48';
const apiKey2: string = 'fcc66e7508964a99802a120ea4417227';

export type getRecipesProps = {
  offset: number;
  count: number;
  query: string;
  mealTypes: MealType[];
};

export const getRecipes = async ({
  offset,
  count,
  query,
  mealTypes,
}: getRecipesProps) => {
  const mealTypesAsString = mealTypes
    .reduce((categoryKeys: string[], current) => {
      return categoryKeys.concat(current.key);
    }, [])
    .join(',')
    .replace(/\s/g, '+');

  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&fillIngredients=true&addRecipeNutrition=true&instructionsRequired=true&number=${count}&offset=${offset}&type=${mealTypesAsString}&apiKey=${apiKey}`
  );
  return response.data;
};

export const getOneRecipe = async (id: number) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`
  );
  return response.data;
};
