import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import * as firebaseapp from 'firebase/app';
// import * as firebasefirestore from 'firebase/firestore';


// import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
// import { getFirestore } from "firebase/firestore";
// import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: 'AIzaSyCrb_war-xeVNz1BSY0BntXPhA2YC_3sRo',
  authDomain: 'mojpies-6cd5b.firebaseapp.com',
  projectId: 'mojpies-6cd5b',
  storageBucket: 'mojpies-6cd5b.appspot.com',
  messagingSenderId: '612116012591',
  appId: '1:612116012591:web:cfd4ab7c7c2c07689230da',
};


// firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const app = initializeApp(firebaseConfig);
const db = getFirestore();



// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();


async function readDocument () {
  const snap = await getDoc(doc(db, 'events/gXKDPe3ZCFfAt2gnNxfK'));
  const docData = snap.data();
  console.log(docData.type);
  return docData;
  
  }

export {
    db,
    readDocument
}


// export default firebase.initializeApp(firebaseConfig);