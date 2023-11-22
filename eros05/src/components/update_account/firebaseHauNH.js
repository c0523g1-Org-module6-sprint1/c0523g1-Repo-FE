import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyCkF-FoO3r8SkT79rEsJzD-Jdng8QV7Wos",
    authDomain: "eros-firebase-a62cb.firebaseapp.com",
    projectId: "eros-firebase-a62cb",
    storageBucket: "eros-firebase-a62cb.appspot.com",
    messagingSenderId: "762404929904",
    appId: "1:762404929904:web:472c5b41eec9899bf38fb5",
};

const appPostFireBase = initializeApp(firebaseConfig, 'hauNh');
export const imagePostHauNH = getStorage(appPostFireBase)