import { auth, googleProvider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";

export default function SignInButton() {
  async function signInWithGoogle() {
    await signInWithPopup(auth, googleProvider);
  }

  return (
    <main className="pt-[15rem] bg-[#cad2c5] h-screen flex justify-center items-center">
      <button
        onClick={signInWithGoogle}
        className="relative items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
      >
        <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-[#84A98c] rounded-full blur-md ease"></span>
        <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
          <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-[#354f52] rounded-full blur-md"></span>
          <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-[#52796F] rounded-full blur-md"></span>
        </span>
        <span className="relative flex gap-2 text-white">
          <img src={"/google.png"} className="w-7 h-7" /> Sign in with Google
        </span>
      </button>
    </main>
  );
}
