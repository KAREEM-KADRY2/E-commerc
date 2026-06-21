import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './i18n'; // Import i18n configuration

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
);
