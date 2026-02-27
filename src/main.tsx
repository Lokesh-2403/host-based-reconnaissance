import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

if (!sessionStorage.getItem('hasSeenLoader')) {
  window.location.replace('/loading.html');
} else {
  sessionStorage.removeItem('hasSeenLoader');
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}