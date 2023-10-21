import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDflh_bnjkUPQJWFaqnqEt_BqC73iADURU",
  authDomain: "time-table-d96d9.firebaseapp.com",
  projectId: "time-table-d96d9",
  storageBucket: "time-table-d96d9.appspot.com",
  messagingSenderId: "643718754058",
  appId: "1:643718754058:web:87643692882f13a8dd54f3"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// Initialize Firebase
const db = firebase.firestore();
export default db