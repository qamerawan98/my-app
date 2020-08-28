import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDPKstD_0p5mlLwXO61xUv4ajECx3z3cBo",
    authDomain: "my-app-64d59.firebaseapp.com",
    databaseURL: "https://my-app-64d59.firebaseio.com",
    projectId: "my-app-64d59",
    storageBucket: "my-app-64d59.appspot.com",
    messagingSenderId: "20999032416",
    appId: "1:20999032416:web:47a00df77a2bbcbd8abd05",
    measurementId: "G-DZ1P805752"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({timestampsInSnapshots: true});

  export  const auth = firebase.auth()
  export  const db = firebase.firestore()

  export default firebase;
