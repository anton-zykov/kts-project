import parse from 'html-react-parser';

// Вставка пробелов в конце предложений. Из api очень многие инструкции к рецептам приходят некрасивые.
const insertSpaces = (s: string): string => {
  const regex = /(?<=[.,!?])(?=[^\s])/g;
  return s.replaceAll(regex, ' ');
};

// Пошаговые инструкции преобразуются в массив.
export const getInstructions = (
  analyzedInstructions: {
    steps: { step: string }[];
  }[]
): string[] => {
  // У части рецептов нет пошаговой инструкции, поэтому нужна проверка.
  if (
    analyzedInstructions.length > 0 &&
    analyzedInstructions[0].hasOwnProperty('steps')
  ) {
    return analyzedInstructions[0].steps.reduce(
      (result: string[], current: { step: string }) => {
        return result.concat(insertSpaces(current.step));
      },
      []
    );
  } else return [];
};

// Обновляются ссылки на похожие рецепты, предоставляемые из api, так, чтобы они вели на страницы нашего приложения.
export const updateLinks = (
  summary: string
): string | JSX.Element | JSX.Element[] => {
  const regex = /https:\/\/spoonacular\.com\/recipes\/\D+/g;
  return parse(
    summary.replaceAll(
      regex,
      process.env.NODE_ENV !== 'production'
        ? '/#/recipe/'
        : '/kts-project/#/recipe/'
    )
  );
};

// Создается строка ингредиентов, разделённых плюсами, для показа на главной странице.
export const formIngredientsLine = (
  extendedIngredients: { name: string; original: string }[]
): string => {
  return extendedIngredients
    .reduce(
      (ingredients: string, current: { name: string }) =>
        ingredients.concat(`${current.name} + `),
      ''
    )
    .slice(0, -3); // Обрезается последний пробел и плюс.
};

// Создается массив ингредиентов для показа на странице рецепта.
export const formArrayOfIngredients = (
  extendedIngredients: { name: string; original: string }[]
): string[] => {
  return extendedIngredients.reduce(
    (ingredients: string[], current: { original: string }) =>
      ingredients.concat(current.original),
    []
  );
};

// Достается и округляется количество калорий.
export const getCalories = (nutrition: any): number => {
  return Math.round(
    nutrition.nutrients.find(
      (nutrient: { name: string }) => nutrient.name === 'Calories'
    ).amount
  );
};
