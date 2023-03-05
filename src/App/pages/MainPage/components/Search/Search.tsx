import { useState } from 'react';
import { FormEvent } from 'react';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import RootStore from '@store/RootStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const [value, setValue] = useState<string>(
    String(RootStore.query.getParam('search'))
  );
  const navigate = useNavigate();

  const handleSearch = (event: FormEvent): void => {
    event.preventDefault();
    navigate(`?search=${value}&count=6`);
  };

  return (
    <form className={styles.main__search} onSubmit={handleSearch}>
      <Input value={value} placeholder="Search" onChange={setValue} />
      <Button className={styles.main__searchButton} type="submit" />
    </form>
  );
};

export default observer(Search);
