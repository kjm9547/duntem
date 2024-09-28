// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAqOX_M8JutrlBNsRQ4GcT4h-gssWdv6o",
  authDomain: "duntem.firebaseapp.com",
  projectId: "duntem",
  storageBucket: "duntem.appspot.com",
  messagingSenderId: "817232218754",
  appId: "1:817232218754:web:5adca14a6f491db149429b",
  measurementId: "G-CFTRSY5P30"
};

export const firebaseInitailizer = () => {
  const app = initializeApp(firebaseConfig); 
  const auth = getAuth(app);
  const db = getFirestore(app);
  return{  
    auth,
    db 
  }  
}
