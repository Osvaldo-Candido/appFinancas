import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDue8qISKUSwEWIKQGu0NnscfNEaC1NWUo',
  authDomain: 'app2-d82cb.firebaseapp.com',
  databaseURL: 'https://app2-d82cb-default-rtdb.firebaseio.com',
  projectId: 'app2-d82cb',
  storageBucket: 'app2-d82cb.firebasestorage.app',
  messagingSenderId: '774581196874',
  appId: '1:774581196874:web:f89ef65d82eb538cc72eb3',
  measurementId: 'G-1ZVG2WEEMT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
