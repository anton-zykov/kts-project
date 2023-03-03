import { useEffect } from 'react';

import { useQueryParamsStoreInit } from '@store/RootStore/hooks/useQueryParamsStoreInit';
import { Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import RecipePage from './pages/RecipePage';

const App = () => {
  useQueryParamsStoreInit();
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/recipe/:id" element={<RecipePage />} />
    </Routes>
  );
};

export default App;
