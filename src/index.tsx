import React from 'react';

import 'config/configureMobX';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'styles/styles.module.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter>
    <ToastContainer />
    <App />
  </HashRouter>
);

if (module.hot) {
  module.hot.accept();
}
