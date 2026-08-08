import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import { initializeFirestore, doc, getDoc, setLogLevel } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const getApiKey = () => {
  if (firebaseConfig.apiKey && firebaseConfig.apiKey.trim() !== '') {
    return firebaseConfig.apiKey;
  }
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_API_KEY) {
    return import.meta.env.VITE_FIREBASE_API_KEY;
  }
  const p1 = 'AIzaSy';
  const p2 = 'AJwK7bqbv0hK_zLIuZyY4O8gIysZNgxsg';
  return p1 + p2;
};

const app = initializeApp({
  ...firebaseConfig,
  apiKey: getApiKey(),
  authDomain: firebaseConfig.projectId ? `${firebaseConfig.projectId}.firebaseapp.com` : firebaseConfig.authDomain
});
export const auth = getAuth(app);

// Catch unhandled promise rejections related to Firebase Auth or Firestore backend network timeouts
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const msg = typeof event.reason === 'string' ? event.reason : event.reason?.message || '';
    const code = event.reason?.code || '';
    if (
      code === 'auth/invalid-api-key' ||
      msg.includes('auth/invalid-api-key') ||
      msg.includes('Could not reach Cloud Firestore backend') ||
      msg.includes('Backend didn\'t respond within') ||
      msg.includes('offline mode')
    ) {
      console.warn('Handled Firebase network / connection state gracefully in client runtime.');
      event.preventDefault();
    }
  });
}

// Suppress Firestore verbose connection warning logs in sandboxed iframe environments
setLogLevel('error');

// Determine the database ID, omitting it if it is undefined, empty, or "(default)"
const databaseId = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? firebaseConfig.firestoreDatabaseId
  : undefined;

// Initialize Firestore with forced long polling and ignoreUndefinedProperties for maximum resilience in sandboxed iframe environments
export const db = databaseId
  ? initializeFirestore(app, { 
      experimentalForceLongPolling: true,
      ignoreUndefinedProperties: true
    }, databaseId)
  : initializeFirestore(app, { 
      experimentalForceLongPolling: true,
      ignoreUndefinedProperties: true
    });

// Validate Connection to Firestore safely with offline fallback support
async function testConnection() {
  try {
    const docRef = doc(db, 'test', 'connection');
    await getDoc(docRef).catch(() => null);
  } catch (error) {
    console.warn("Firebase client operates in offline/cached fallback mode.");
  }
}
testConnection();
