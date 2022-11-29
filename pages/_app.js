import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { UserContext } from "../context/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    let unsub;

    if (user) {
      unsub = onSnapshot(doc(db, "users", `${user.uid}`), (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }
    return unsub;
  }, [user]);

  return (
    <UserContext.Provider value={{ user, username }}>
      <Toaster />
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
