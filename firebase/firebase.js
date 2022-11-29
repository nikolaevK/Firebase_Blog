import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5fvbU3zkMoeup9ItX2EDIPE3qO_wYTBk",
  authDomain: "blogging-app-4f959.firebaseapp.com",
  projectId: "blogging-app-4f959",
  storageBucket: "blogging-app-4f959.appspot.com",
  messagingSenderId: "507652025410",
  appId: "1:507652025410:web:cf14406ac4ac68f58811db",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export async function getUserWithUsername(username) {
  const userRef = collection(db, "users");
  const q = query(userRef, where("username", "==", username));
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

export function postToJSON(doc) {
  const data = doc.data();

  return {
    ...data,
    createdAt: data?.createdAt?.toMillis() || 0,
    updatedAt: data?.updatedAt?.toMillis() || 0,
  };
}
