import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAISvTMN9m9R3OJe6CQJHeU_TZd_ecAzXo",
    authDomain: "cyberpunk-chirp.firebaseapp.com",
    databaseURL: "https://cyberpunk-chirp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cyberpunk-chirp",
    storageBucket: "cyberpunk-chirp.appspot.com",
    messagingSenderId: "666850533825",
    appId: "1:666850533825:web:04d96e49ab942810064f40",
    measurementId: "G-41EE1105TP"
};

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const storage = firebase.storage();
export default firebase