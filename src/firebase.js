import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
} from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHP7I_CDk24cQXWtGUcgDZFSpG-zJcJW0",
  authDomain: "sara-reading-log.firebaseapp.com",
  projectId: "sara-reading-log",
  storageBucket: "sara-reading-log.firebasestorage.app",
  messagingSenderId: "324877421887",
  appId: "1:324877421887:web:45ba3fe97d2c9c5368d78a",
  measurementId: "G-D0H78LZLFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Same school domain as the original site — no change needed here since
// Sara's students are on the same @nicholsschool.org Google Workspace.
export const SCHOOL_DOMAIN = "nicholsschool.org";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ hd: SCHOOL_DOMAIN });

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  const email = result.user.email || "";
  if (!email.toLowerCase().endsWith("@" + SCHOOL_DOMAIN)) {
    await signOut(auth);
    throw new Error(`Please sign in with your school account (@${SCHOOL_DOMAIN}).`);
  }
  return result.user;
}

export function signOutUser() {
  return signOut(auth);
}

export function watchAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}

// Reused as-is — this Worker is generic (Open Library proxy only, touches
// no Firestore data), so both sites can share the exact same one.
export const ISBN_LOOKUP_URL = "https://isbn-lookup.gpowers.workers.dev";
