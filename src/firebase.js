import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJdcKJqS7MjeTHABpBdDCM5Kp6qAw4e5w",
  authDomain: "wibs-app.firebaseapp.com",
  projectId: "wibs-app",
  storageBucket: "wibs-app.firebasestorage.app",
  messagingSenderId: "813886700904",
  appId: "1:813886700904:web:a567c6667d34fcff5e6add"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
