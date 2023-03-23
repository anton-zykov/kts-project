import React from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.notFound} onClick={() => navigate('/')}>
      <div className={styles.notFound__text}>
        Sorry, this page does not exist! Click anywhere to return to the main
        page.
      </div>
    </div>
  );
};

export default NotFound;
