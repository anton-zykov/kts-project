import React from 'react';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { BASECOUNT } from 'config/constants';
import { useNavigate } from 'react-router-dom';
import rootStore from 'store/RootStore';

import styles from './Search.module.scss';

const Search: React.FC = React.memo(() => {
  const [value, setValue] = React.useState<string | undefined>(
    rootStore.query.getParam('search')
  );
  const navigate = useNavigate();

  const handleSearch = React.useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (value === '') rootStore.query.setSearch(undefined);
    else rootStore.query.setSearch(value);

    rootStore.query.setCount(BASECOUNT);

    rootStore.recipes.clearRecipes();
    navigate(rootStore.query.URLParams);
    await rootStore.recipes.fetchRecipes();
  }, []);

  return (
    <form className={styles.main__search} onSubmit={handleSearch}>
      <Input value={value ?? ''} placeholder="Search" onChange={setValue} />
      <Button className={styles.main__searchButton} type="submit" />
    </form>
  );
});

export default Search;
