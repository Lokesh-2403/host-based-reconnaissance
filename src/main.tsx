import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const params = new URLSearchParams(window.location.search);

if (!params.has('loaded')) {
  window.location.replace('/loading.html');
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}