import { recipe } from 'store/models';

/* Получение списка инструкций из сложного объекта, присланного api.
  Пришлось изменить подход на более некрасивый по сравнению с дз3,
  чтобы не делать новые запросы для рецептов, которые были на главной странице.
  У них не получается запросить поле instructions, а можно только такое.
  Зато теперь можно пользоваться глобальным стором и в большинстве случаев
  не пользоваться сетью. */
const getInstructions = (recipe: recipe): string[] => {
  return recipe.analyzedInstructions[0].steps.reduce(
    (result: string[], current: { step: string }) => {
      return result.concat(current.step);
    },
    []
  );
};

const updateLinks = (summary: string): string => {
  const regex = /https:\/\/spoonacular\.com\/recipes\/\D+/g;
  return summary.replaceAll(regex, '/recipe/');
};

export { getInstructions, updateLinks };
