import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { update, set, getDatabase, ref as refText, push, onValue, orderByChild, query, equalTo, limitToLast, orderByKey } from "firebase/database";
import { getStorage, ref as refImage, uploadBytes, getDownloadURL } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyC5xzTI0txE3PfdEeMTc79iqmqsdBAZBRI",
    authDomain: "cupid-project-439b5.firebaseapp.com",
    projectId: "cupid-project-439b5",
    storageBucket: "cupid-project-439b5.appspot.com",
    messagingSenderId: "1083460341772",
    appId: "1:1083460341772:web:504edaa8b60c8ecaed1e29",
    measurementId: "G-7NB8CXSBRT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { update, set, orderByKey, limitToLast, database, refText, push, onValue, orderByChild, query, equalTo, storage, refImage, uploadBytes, getDownloadURL };