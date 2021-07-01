// https://facebook-2-6eb19.firebaseapp.com/__/auth/handler

import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANser_lgovc2kb2wRetmgX8UpWD7T1rgY",
  authDomain: "linkedin-clone-83327.firebaseapp.com",
  projectId: "linkedin-clone-83327",
  storageBucket: "linkedin-clone-83327.appspot.com",
  messagingSenderId: "91437269891",
  appId: "1:91437269891:web:69fb8033bd45efe6542cb6",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const storage = firebase.storage();

export { auth, db, storage };
