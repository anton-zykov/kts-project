export type recipe = {
  id: number;
  title: string;
  image: string;
  extendedIngredients: { name: string; original: string }[];
  nutrition: any;
  instructions: string;
  readyInMinutes: number;
  aggregateLikes: number;
  summary: string;
};
