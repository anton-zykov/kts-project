export enum Meta {
  initial = 'initial',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export type MealType = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

export const mealTypes: MealType[] = [
  {
    key: 'main course',
    value: 'Main Course',
  },
  {
    key: 'side dish',
    value: 'Side Dish',
  },
  {
    key: 'dessert',
    value: 'Dessert',
  },
  {
    key: 'appetizer',
    value: 'Appetizer',
  },
  {
    key: 'salad',
    value: 'Salad',
  },
  {
    key: 'bread',
    value: 'Bread',
  },
  {
    key: 'breakfast',
    value: 'Breakfast',
  },
  {
    key: 'soup',
    value: 'Soup',
  },
  {
    key: 'beverage',
    value: 'Beverage',
  },
  {
    key: 'sauce',
    value: 'Sauce',
  },
  {
    key: 'marinade',
    value: 'Marinade',
  },
  {
    key: 'fingerfood',
    value: 'Fingerfood',
  },
  {
    key: 'snack',
    value: 'Snack',
  },
  {
    key: 'drink',
    value: 'Drink',
  },
];
