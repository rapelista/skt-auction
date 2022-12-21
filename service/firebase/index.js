import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDA5Nf95loo0Frco5XzVgfQq2xppA439x4",
  authDomain: "auction-skt.firebaseapp.com",
  projectId: "auction-skt",
  storageBucket: "auction-skt.appspot.com",
  messagingSenderId: "1055047510851",
  appId: "1:1055047510851:web:a3ad6a8819911c6ef45df6",
  measurementId: "G-ZV7DVQD2GR",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
