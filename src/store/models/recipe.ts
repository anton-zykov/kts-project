import {
  getCalories,
  formIngredientsLine,
  getInstructions,
  updateLinks,
  formArrayOfIngredients,
} from './normalizationFunctions';

export type RecipeApi = {
  id: number;
  title: string;
  image: string;
  extendedIngredients: { name: string; original: string }[];
  nutrition: any;
  analyzedInstructions: any;
  readyInMinutes: number;
  aggregateLikes: number;
  summary: string;
};

export type RecipeModel = {
  id: number;
  title: string;
  image: string;
  allIngredientsLine: string;
  ingredients: string[];
  calories: number;
  instructions: string[];
  readyInMinutes: number;
  likes: number;
  summary: string | JSX.Element | JSX.Element[];
};

export const normalizeRecipe = (from: RecipeApi): RecipeModel => ({
  id: from.id,
  title: from.title,
  image: from.image,
  allIngredientsLine: formIngredientsLine(from.extendedIngredients),
  ingredients: formArrayOfIngredients(from.extendedIngredients),
  calories: getCalories(from.nutrition),
  instructions: getInstructions(from.analyzedInstructions),
  readyInMinutes: from.readyInMinutes,
  likes: from.aggregateLikes,
  summary: updateLinks(from.summary),
});
