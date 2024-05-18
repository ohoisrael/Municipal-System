// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "municipal-system-59d7e.firebaseapp.com",
    projectId: "municipal-system-59d7e",
    storageBucket: "municipal-system-59d7e.appspot.com",
    messagingSenderId: "359074272115",
    appId: "1:359074272115:web:7cb6835a2eea357180eb06"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);