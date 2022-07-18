import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './App';
import reportWebVitals from './reportWebVitals';

import todosSlice from './modules/todos';
import notesSlice from './modules/memory';
import modalSlice from './modules/modal';

const store = configureStore({
  reducer: {
    todosSlice,
    notesSlice,
    modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  // 리덕스로의 함수전달시 직렬화 체크기능을 해제함.
  // 기본적으로, 리덕스의 상태는 직렬화 할 수 있는 값이여야하므로, 위의 내용을 사용하지 않는 것이 권장된다.
});

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    container,
    <HelmetProvider>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </HelmetProvider>
  );
} else {
  root.render(
    <HelmetProvider>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </HelmetProvider>
  );
}

reportWebVitals();
