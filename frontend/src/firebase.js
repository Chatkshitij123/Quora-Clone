// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACAckU_lK-FP1BLGG4creEjB8VKS4OXss",
  authDomain: "quora-clone-mern-cbab6.firebaseapp.com",
  projectId: "quora-clone-mern-cbab6",
  storageBucket: "quora-clone-mern-cbab6.appspot.com",
  messagingSenderId: "857311270098",
  appId: "1:857311270098:web:72eda58d9a0cbd243fc90b",
  measurementId: "G-BC5P590RNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };