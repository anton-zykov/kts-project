import { Button } from '@components/Button';
import { Input } from '@components/Input';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  return (
    <div className={styles.main__search}>
      <Input value="" placeholder="Search" onChange={() => {}} />
      <Button className={styles.main__searchButton} />
    </div>
  );
};

export default Search;
