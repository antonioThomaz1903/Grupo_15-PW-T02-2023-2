// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO1vn5t7kzfAmsumKfoerO6_cuLojh1r8",
  authDomain: "thisorthat-pw-g15.firebaseapp.com",
  projectId: "thisorthat-pw-g15",
  storageBucket: "thisorthat-pw-g15.appspot.com",
  messagingSenderId: "720167533430",
  appId: "1:720167533430:web:463828eadea031427e5857",
  measurementId: "G-SRR5N648DZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, analytics, db, auth};