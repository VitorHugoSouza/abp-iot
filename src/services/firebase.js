import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDqoJQHMFDfhTV2FnIVTNSKnImpHLfZcp8",
  authDomain: "sys-monitoramento.firebaseapp.com",
  databaseURL: "https://sys-monitoramento-default-rtdb.firebaseio.com",
  projectId: "sys-monitoramento",
  storageBucket: "sys-monitoramento.appspot.com",
  messagingSenderId: "503949278856",
  appId: "1:503949278856:web:63523d416f8eeb84af293d"
};

const fire = initializeApp(firebaseConfig);
const db = getDatabase(fire);

export { fire, db };



















/*/ Import the firebase package downloaded to this project folder through npm
import firebase from "firebase";

// Define a variable of the project name, which is used in the config parameters for firebase
const firebaseProjectName = "sys-monitoramento"

// Parameters required by the initializeApp used below
const config = {
  apiKey: "<YOUR_WEB_API_KEY>",
  authDomain: `${firebaseProjectName}.firebaseapp.com`,
  databaseURL: `https://${firebaseProjectName}.firebaseio.com`,
  projectId: `${firebaseProjectName}`
};

firebase.initializeApp(config);

export default firebase;*/