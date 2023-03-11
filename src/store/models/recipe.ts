export type Recipe = {
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
