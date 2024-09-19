// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './input.css'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
