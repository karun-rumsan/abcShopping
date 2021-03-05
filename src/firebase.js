// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC2LU2xGzo626pDqvGUBpbW2GPF2x5tSKw",
  authDomain: "clone-e-2d18c.firebaseapp.com",
  projectId: "clone-e-2d18c",
  storageBucket: "clone-e-2d18c.appspot.com",
  messagingSenderId: "249949366",
  appId: "1:249949366:web:ca7b413fc7c812d6360a17",
  measurementId: "G-2F33JS4HYF",
};
//nitialize the firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig);

//initialiste the firebase database i.e firestore
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
