
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDFZdNNggaNYpceVnEFRkWjE2knDyI7_gc",
  authDomain: "bantuinyuk-207ae.firebaseapp.com",
  projectId: "bantuinyuk-207ae",
  storageBucket: "bantuinyuk-207ae.appspot.com",
  messagingSenderId: "105030900119",
  appId: "1:105030900119:web:e0bb8a932510ce753e4cd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export{auth,db};

