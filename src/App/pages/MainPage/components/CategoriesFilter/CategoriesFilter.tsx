import React from 'react';

import { Button } from 'components/Button';
import { MultiDropdown } from 'components/MultiDropdown';
import { BASECOUNT } from 'config/constants';
import { useNavigate } from 'react-router-dom';
import rootStore from 'store/RootStore/instance';
import { MealType, mealTypes } from 'utils/types';

import styles from './CategoriesFilter.module.scss';

const CategoriesFilter: React.FC = React.memo(() => {
  const [selectedCategories, setSelectedCategories] = React.useState<
    MealType[]
  >(rootStore.query.getArrayOfMealTypes());
  const navigate = useNavigate();

  const handleChange = React.useCallback(async (newValue: MealType[]) => {
    setSelectedCategories(newValue);

    rootStore.query.setTypes(newValue);
    rootStore.query.setCount(BASECOUNT);

    rootStore.recipes.clearRecipes();
    navigate(rootStore.query.getURLParams());
    await rootStore.recipes.fetchRecipes();
  }, []);

  const pluralizeOptions = React.useCallback((value: MealType[]): string => {
    return value
      .reduce((categoryNames: string[], current) => {
        return categoryNames.concat(current.value);
      }, [])
      .join(', ');
  }, []);

  const handleRandomizeChange = React.useCallback(async () => {
    rootStore.query.getParam('sort')
      ? rootStore.query.setSort(undefined)
      : rootStore.query.setSort('random');

    rootStore.recipes.clearRecipes();
    navigate(rootStore.query.getURLParams());
    await rootStore.recipes.fetchRecipes();
  }, []);

  return (
    <div className={styles.main__categoriesAndRandom}>
      <Button
        className={styles.main__shuffleButton}
        onClick={handleRandomizeChange}
      >
        {rootStore.query.getParam('sort') ? 'Randomize:⠀On' : 'Randomize:⠀Off'}
      </Button>
      <MultiDropdown
        mealTypes={mealTypes}
        value={selectedCategories}
        onChange={(newValue: MealType[]) => handleChange(newValue)}
        pluralizeOptions={(value: MealType[]) => pluralizeOptions(value)}
      />
    </div>
  );
});

export default CategoriesFilter;
