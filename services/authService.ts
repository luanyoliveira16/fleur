import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

export async function register(email: string, senha: string) {
  return await createUserWithEmailAndPassword(auth, email, senha);
}

export async function login(email: string, senha: string) {
  return await signInWithEmailAndPassword(auth, email, senha);
}

export async function logout() {
  return await signOut(auth);
}

export async function loginGoogle() {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
}

export async function loginFacebook() {
  const provider = new FacebookAuthProvider();
  return await signInWithPopup(auth, provider);
}