import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

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