import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';

import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';
import RecipePage from './pages/RecipePage';

const App: React.FC = () => {
  useQueryParamsStoreInit();
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/recipe/:id" element={<RecipePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
