import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

// const firebaseConfig = {***PASTE THE CONFIGURATION HERE AND UNCOMMENT THIS LINE***}

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);