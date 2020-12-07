import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBsOIde6AqWFj7qX4P6CFQlX0K31FoKAL0",
    authDomain: "cyberpunk-chirps.firebaseapp.com",
    projectId: "cyberpunk-chirps",
    storageBucket: "cyberpunk-chirps.appspot.com",
    messagingSenderId: "872159359565",
    appId: "1:872159359565:web:60efcd920df52a87576204",
    measurementId: "G-4481GWXV76"
};

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const storage = firebase.storage();
export default firebase