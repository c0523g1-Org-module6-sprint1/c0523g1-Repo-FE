import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import 'firebase/firestore'
import { getDatabase,ref,push,onValue} from "firebase/database";



const firebaseConfig = {
    apiKey: "AIzaSyAQBMRXbr583_4EM2nHFCh0d1kcuJ0FIf0",
    authDomain: "case-study-module6.firebaseapp.com",
    projectId: "case-study-module6",
    storageBucket: "case-study-module6.appspot.com",
    messagingSenderId: "586805031013",
    appId: "1:586805031013:web:8d4a8b7234d2529dc0568c",
    measurementId: "G-S1KH080KFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export {database,ref,push,onValue}

