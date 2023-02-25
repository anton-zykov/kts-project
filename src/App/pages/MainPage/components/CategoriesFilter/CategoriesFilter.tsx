import { MultiDropdown } from '@components/MultiDropdown';

import styles from './CategoriesFilter.module.scss';

const CategoriesFilter: React.FC = () => {
  return (
    <div className={styles.main__categories}>
      <MultiDropdown
        options={[]}
        value={[]}
        onChange={() => {}}
        pluralizeOptions={() => 'Nothing yet'}
      />
    </div>
  );
};

export default CategoriesFilter;
