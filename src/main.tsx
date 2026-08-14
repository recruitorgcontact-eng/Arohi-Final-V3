import './firebase';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// Suppress benign ResizeObserver notifications loop error in browser
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    if (e.message && (e.message.includes('ResizeObserver loop') || e.message.includes('undelivered notifications'))) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  });
}

// Clean up service workers in dev/iframe environment to prevent stale cache or blank iframe preview
if ('serviceWorker' in navigator) {
  if (import.meta.env.DEV || (typeof window !== 'undefined' && window.self !== window.top)) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
  } else {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((reg) => {
          console.log('[PWA] Service Worker registered successfully with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);


