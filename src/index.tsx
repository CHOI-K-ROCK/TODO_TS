import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import store from 'modules/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

const renderApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, renderApp());
} else {
  root.render(renderApp());
}

reportWebVitals();
