import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAJkc3zlRb5cjoyJSy4h2vz-ABhm69fZOA",
  authDomain: "dota-47e08.firebaseapp.com",
  databaseURL: "https://dota-47e08-default-rtdb.firebaseio.com",
  projectId: "dota-47e08",
  storageBucket: "dota-47e08.appspot.com",
  messagingSenderId: "592533150738",
  appId: "1:592533150738:web:6862f2b78235cd4352cccb"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();