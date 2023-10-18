import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4gcZrxq26HcVFd6XTv0oWxpHMpP6AxZc",
  authDomain: "ventra-clientes-web.firebaseapp.com",
  projectId: "ventra-clientes-web",
  storageBucket: "ventra-clientes-web.appspot.com",
  messagingSenderId: "529526180541",
  appId: "1:529526180541:web:55828b2689a269e64085d4",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
