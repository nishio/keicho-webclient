// Initialize Firebase
import * as firebase from "firebase/app";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyB0wAxxeLeHr4udunpln5jCYpGpFGn7D00",
  authDomain: "regroup-d4932.firebaseapp.com",
  projectId: "regroup-d4932",
};

// @ts-ignore
firebase.initializeApp(config);
// @ts-ignore
let db = firebase.firestore();

export default db;
