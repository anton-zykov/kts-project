import axios from 'axios';
import { MealType } from 'utils/types';

const apiKeys = [
  '55f1c4089ef4436ba921d637e72b3053',
  'a0b450164ebb4fff8a2765b6dd37ad48',
  '11d384b0beef43fa942e43f83285b4b7',
  'fcc66e7508964a99802a120ea4417227',
];

let currentKey = 0;

export type getRecipesProps = {
  offset: number;
  count: number;
  query: string;
  mealTypes: MealType[];
  random: string;
  k: string;
};

export const getRecipes = async ({
  offset,
  count,
  query,
  mealTypes,
  random,
  k,
}: getRecipesProps) => {
  const mealTypesAsString = mealTypes
    .reduce((categoryKeys: string[], current) => {
      return categoryKeys.concat(current.key);
    }, [])
    .join(',')
    .replace(/\s/g, '+');

  while (currentKey <= 3) {
    try {
      const response = await axios.get(
        // eslint-disable-next-line prettier/prettier
        `https://api.spoonacular.com/recipes/complexSearch?sort=${random}&query=${query}&fillIngredients=true&addRecipeNutrition=true&instructionsRequired=true&number=${count}&offset=${offset}&type=${mealTypesAsString}&apiKey=${k ? k : apiKeys[currentKey]}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 402) currentKey += 1;
      else throw new Error('All keys are used. Please wait until tomorrow.');
    }
  }
};

export const getOneRecipe = async (id: number, k: string) => {
  while (currentKey <= 3) {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${
          k ? k : apiKeys[currentKey]
        }`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 402) currentKey += 1;
      else throw new Error('All keys are used. Please wait until tomorrow.');
    }
  }
};
