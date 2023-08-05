

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl_9bcHrFlASXCHMqvt0perx7y4yLve28",
  authDomain: "betahouse-82297.firebaseapp.com",
  projectId: "betahouse-82297",
  storageBucket: "betahouse-82297.appspot.com",
  messagingSenderId: "850003534610",
  appId: "1:850003534610:web:78d494bd61b17a6cc549cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);
const db = getFirestore(app); // Initialize Firestore

export { storage, db }; // Export the storage and db instances


