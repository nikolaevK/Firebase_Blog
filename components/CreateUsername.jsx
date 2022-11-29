import { db } from "../firebase/firebase";
import { useContext, useState, useCallback, useEffect } from "react";
import { UserContext } from "../context/context";
import { writeBatch, doc, getDoc } from "firebase/firestore";
import UsernameMessage from "./UsernameMessage";
import { useRouter } from "next/router";
const debounce = require("lodash.debounce");

export default function CreateUsername() {
  const { user, username } = useContext(UserContext);
  const [usernameValue, setUsernameValue] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [loading, setLoading] = useState(null);
  const router = useRouter();

  async function createUser(e) {
    e.preventDefault();

    const batch = writeBatch(db);
    const userRef = doc(db, `users/${user?.uid}`);
    const usernameRef = doc(db, `usernames/${usernameValue}`);

    batch.set(userRef, {
      username: usernameValue,
      photoURL: user?.photoURL,
      displayName: user?.displayName,
    });
    batch.set(usernameRef, { uid: user?.uid });

    await batch.commit();
    router.push("/blog");
  }

  function createUserName(e) {
    const inputValue = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (inputValue.length < 3) {
      setUsernameValue(inputValue);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(inputValue)) {
      setUsernameValue(inputValue);
      setLoading(true);
      setIsValid(false);
    }
  }

  useEffect(() => {
    checkUsername(usernameValue);
    //eslint-disable-next-line
  }, [usernameValue]);

  // UseCallback is needed in order for the whole function to work,
  // it returns the whole function and not just the return statement
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const docRef = doc(db, `usernames/${username}`);
        const docSnap = await getDoc(docRef);
        setIsValid(!docSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section className="bg-[#CAD2c5] h-screen py-[40rem]">
        <form className="flex flex-col" onSubmit={createUser}>
          <input
            className="w-[80%] justify-center text-center m-auto py-2 font-semibold outline-none rounded-md"
            placeholder="Create Username"
            onChange={createUserName}
            value={usernameValue}
          />
          <UsernameMessage
            username={username}
            isValid={isValid}
            loading={loading}
          />
          <button
            disabled={!isValid}
            className="relative inline-block px-4 py-2 w-44 m-auto mt-5 font-medium group"
          >
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#354f52] group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-[#354f52] group-hover:bg-[#354f52]"></span>
            <span className="relative text-[#354f52] group-hover:text-white">
              Create Username
            </span>
          </button>
        </form>
      </section>
    )
  );
}
