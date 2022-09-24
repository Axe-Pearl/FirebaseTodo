import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//firebase configurations
const firebaseConfig = {
    apiKey: "AIzaSyBTNRejCneDDs2WJUWmbVwcIZufAtkDMV0",
    authDomain: "react-todo-f9bb9.firebaseapp.com",
    projectId: "react-todo-f9bb9",
    storageBucket: "react-todo-f9bb9.appspot.com",
    messagingSenderId: "573685481727",
    appId: "1:573685481727:web:44cf84fec8696404cd0cca",
    measurementId: "G-ZG1XHYF7FL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
