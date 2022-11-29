import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

export default function SignOutButton() {
  const router = useRouter();
  function logOut() {
    signOut(auth)
      .then(() => {
        router.push("/enter");
        console.log("Signed Out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <button
      onClick={logOut}
      className="relative px-6 py-3 font-bold text-white group"
    >
      <span className="absolute inset-0 w-full h-14 transition duration-300 ease-out transform translate-x-2 -translate-y-2 bg-[#354F52] group-hover:translate-x-0 group-hover:translate-y-0"></span>
      <span className="absolute inset-0 w-full h-14 border-4 border-black"></span>
      <span className="relative">Logout</span>
    </button>
  );
}
