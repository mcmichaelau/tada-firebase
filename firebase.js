import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDE5WSaDSYdxCRUgA1fS7LE1DszmcsmKYY",
    authDomain: "tada-project-d831e.firebaseapp.com",
    projectId: "tada-project-d831e",
    storageBucket: "tada-project-d831e.firebasestorage.app",
    messagingSenderId: "447583257027",
    appId: "1:447583257027:web:a3104103a72218b2793d76",
    measurementId: "G-KF954C65ZS"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);