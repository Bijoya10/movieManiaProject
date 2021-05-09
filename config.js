import firebase from "firebase";
require("@firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyAeG5CoL46p2Tf3X42PEie8dpVYtUXoSPc",
  authDomain: "test-e365a.firebaseapp.com",
  projectId: "test-e365a",
  storageBucket: "test-e365a.appspot.com",
  messagingSenderId: "1068552715171",
  appId: "1:1068552715171:web:268baa08df71b24567b816"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();