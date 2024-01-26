import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA-b7SwhXmzGnLEKRnV7eNiN9r5CAmTyZI",
  authDomain: "harmony-b7812.firebaseapp.com",
  projectId: "harmony-b7812",
  storageBucket: "harmony-b7812.appspot.com",
  messagingSenderId: "477026061709",
  appId: "1:477026061709:web:d7197c594bca2386cfc1c4"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);