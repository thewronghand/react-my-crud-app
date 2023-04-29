import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firestore } from "firebase/firestore";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwvbtYB1aFvsPR6ulpDmjXwK_CqSJG7KY",
  authDomain: "react-my-crud-app.firebaseapp.com",
  databaseURL:
    "https://react-my-crud-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-my-crud-app",
  storageBucket: "react-my-crud-app.appspot.com",
  messagingSenderId: "348431466799",
  appId: "1:348431466799:web:256ff9c5b30bfd21a9e1da",
  measurementId: "G-HGMQ6EY52F",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const postsCollection = collection(db, "posts");
const tagsCollection = collection(db, "tags");

export { db, postsCollection, tagsCollection };
