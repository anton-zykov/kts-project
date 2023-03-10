import React from 'react';

import styles from './WithLoader.module.scss';
import { Loader, LoaderSize } from '../Loader';

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

export const WithLoader: React.FC<WithLoaderProps> = React.memo(
  ({ loading, children }) => {
    return (
      <div className={styles.WithLoader}>
        {loading && (
          <Loader className={styles.Loaderm_center} size={LoaderSize.m} />
        )}
        {children}
      </div>
    );
  }
);
