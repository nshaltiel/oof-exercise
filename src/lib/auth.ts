import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from './firebase';

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  return signInWithPopup(auth, provider);
}

export async function signOut() {
  return firebaseSignOut(auth);
}
