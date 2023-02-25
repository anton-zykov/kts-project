import axios from 'axios';

const apiKey: string = '55f1c4089ef4436ba921d637e72b3053';
//const baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;

export const getTenRecipes = async (offset: number = 0) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?fillIngredients=true&addRecipeNutrition=true&number=10&offset=${offset}&apiKey=${apiKey}`
  );
  return response.data;
};

export const getOneRecipe = async (id: number) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
  );
  return response.data;
};

export const searchRecipe = async (query: string) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`
  );
  return response.data;
};
