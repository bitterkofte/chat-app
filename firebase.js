// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTmQ2XEY3KGQRAlZH_GSEGJPW3rziDK0o",
  authDomain: "chatter-d873d.firebaseapp.com",
  projectId: "chatter-d873d",
  storageBucket: "chatter-d873d.appspot.com",
  messagingSenderId: "886973914506",
  appId: "1:886973914506:web:233c02e19a4b23c3e8bc73"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

let app;
if (firebase.apps. length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

const auth = firebase.auth();
const db = app.firestore();

export { auth, db };