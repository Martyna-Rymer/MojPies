import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCrb_war-xeVNz1BSY0BntXPhA2YC_3sRo',
  authDomain: 'mojpies-6cd5b.firebaseapp.com',
  projectId: 'mojpies-6cd5b',
  storageBucket: 'mojpies-6cd5b.appspot.com',
  messagingSenderId: '612116012591',
  appId: '1:612116012591:web:cfd4ab7c7c2c07689230da'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}