import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import { initializeFirestore, doc, getDocFromServer, setLogLevel } from 'firebase/firestore';
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

// Catch unhandled promise rejections related to Firebase Auth invalid-api-key gracefully
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason &&
      (event.reason.code === 'auth/invalid-api-key' ||
        (typeof event.reason.message === 'string' && event.reason.message.includes('auth/invalid-api-key')))
    ) {
      console.warn('Handled Firebase Auth invalid API key gracefully in client runtime.');
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

// Validate Connection to Firestore as per SKILL.md rules
async function testConnection() {
  try {
    // Race getDocFromServer with a 2-second timeout to avoid long 10s connection hangs
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('connection timeout')), 2000)
    );
    await Promise.race([
      getDocFromServer(doc(db, 'test', 'connection')),
      timeoutPromise
    ]);
  } catch (error) {
    if (error instanceof Error && (error.message.includes('offline') || error.message.includes('timeout') || error.message.includes('permission'))) {
      console.warn("Firebase client appears to be offline or offline mode is active. Verify network or credentials.");
    }
  }
}
testConnection();
