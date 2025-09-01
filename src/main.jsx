import { I18nProvider } from '@/lib/i18n';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // garante minúsculas

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    + <I18nProvider><App /></I18nProvider>
  </React.StrictMode>
);
