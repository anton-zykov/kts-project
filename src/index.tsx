import React from 'react';

import 'config/configureMobX';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'styles/styles.module.scss';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (module.hot) {
  module.hot.accept();
}
