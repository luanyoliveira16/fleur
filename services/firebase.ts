import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDst1KQYKLVHC6CUDPBc0hwsrIRW6O2pHI",
    authDomain: "fleur-794e9.firebaseapp.com",
    projectId: "fleur-794e9",
    storageBucket: "fleur-794e9.firebasestorage.app",
    messagingSenderId: "364841519076",
    appId: "1:364841519076:web:d78701c6e15458acb329f1",
    measurementId: "G-X0C17GGWMH"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 