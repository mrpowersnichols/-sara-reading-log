import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "PASTE_FROM_FIREBASE_CONSOLE",
  authDomain: "PASTE_FROM_FIREBASE_CONSOLE",
  projectId: "PASTE_FROM_FIREBASE_CONSOLE",
  storageBucket: "PASTE_FROM_FIREBASE_CONSOLE",
  messagingSenderId: "PASTE_FROM_FIREBASE_CONSOLE",
  appId: "PASTE_FROM_FIREBASE_CONSOLE",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

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

export const ISBN_LOOKUP_URL = "https://isbn-lookup.gpowers.workers.dev";
