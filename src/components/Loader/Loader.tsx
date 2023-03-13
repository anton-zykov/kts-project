import React from 'react';

import styles from './Loader.module.scss';

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

export const Loader: React.FC<LoaderProps> = React.memo(
  ({ loading = true, size = 'm', className }) => {
    if (loading === false) {
      return null;
    }

    return (
      <div className={className ? className : `${styles[`Loader${size}`]}`} />
    );
  }
);
