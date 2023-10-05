// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4gcZrxq26HcVFd6XTv0oWxpHMpP6AxZc",
  authDomain: "ventra-clientes-web.firebaseapp.com",
  projectId: "ventra-clientes-web",
  storageBucket: "ventra-clientes-web.appspot.com",
  messagingSenderId: "529526180541",
  appId: "1:529526180541:web:55828b2689a269e64085d4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
