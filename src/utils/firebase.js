import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAz185oTFDT5-9KZqIrwJvL-eXiO5qZVLs",
  authDomain: "merc-4c04d.firebaseapp.com",
  projectId: "merc-4c04d",
  storageBucket: "merc-4c04d.appspot.com",
  messagingSenderId: "426563776806",
  appId: "1:426563776806:web:5d6fc30cdb132881c7d1e7"
};

firebase.initializeApp(firebaseConfig);


const firebaseApp = {
    firestore: firebase.firestore(),
    auth: firebase.auth()
}

export default firebaseApp
