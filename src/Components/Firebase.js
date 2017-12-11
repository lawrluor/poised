// Firebase
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB3gLva99xmyuUFWlm0aGSHD0OgD9TmV7I",
  authDomain: "poiseapp-a177f.firebaseapp.com",
  databaseURL: "https://poiseapp-a177f.firebaseio.com",
  serviceAccount: "./service-account.json",
  storageBucket: "",
  messagingSenderId: "786295975442"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
