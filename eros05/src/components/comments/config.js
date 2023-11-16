// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import firebase from "firebase/compat";
import {getDatabase, push, ref, onValue} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyARBr2_0TKWwzPl_5cci4fHBb0TeZMNz94",
    authDomain: "modelu-6.firebaseapp.com",
    databaseURL: "https://modelu-6-default-rtdb.firebaseio.com",
    projectId: "modelu-6",
    storageBucket: "modelu-6.appspot.com",
    messagingSenderId: "593690171671",
    appId: "1:593690171671:web:6c9ef487de85a47072ff52",
    measurementId: "G-XYPD8E4X6Q"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app)

export {database, push, ref, onValue}
