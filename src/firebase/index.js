import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyCrb_war-xeVNz1BSY0BntXPhA2YC_3sRo',
  authDomain: 'mojpies-6cd5b.firebaseapp.com',
  projectId: 'mojpies-6cd5b',
  storageBucket: 'mojpies-6cd5b.appspot.com',
  messagingSenderId: '612116012591',
  appId: '1:612116012591:web:cfd4ab7c7c2c07689230da',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(app);


async function readDocument () {
  const snap = await getDoc(doc(db, 'events/gXKDPe3ZCFfAt2gnNxfK'));
  const docData = snap.data();
  console.log(docData.type);
  return docData;
  
  }

export {
    db,
    readDocument,
    storage
}

export const auth = getAuth(app);