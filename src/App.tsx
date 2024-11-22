import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import MainPage from 'pages/MainPage';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Router basename="/memory_todo">
        <MainPage />
      </Router>
    </HelmetProvider>
  );
}

export default App;
