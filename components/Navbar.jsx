import Link from "next/link";
import { SiBloglovin } from "react-icons/si";
import { UserContext } from "../context/context";
import { useContext } from "react";
import SignOutButton from "./SignOutButton";

export default function Navbar() {
  const { user, username } = useContext(UserContext);
  return (
    <nav className="fixed top-0 h-36 w-full bg-white shadow-[5px_5px_10px_#878787] z-50">
      <ul className="flex justify-between py-14 px-14">
        <li className="text-[#52796F]">
          <Link href="/">
            <SiBloglovin className="h-12 w-12" />
          </Link>
        </li>
        <li className="text-[#52796F] flex gap-8 justify-between text-center">
          <Link href="/blog" className="text-3xl pt-2 font-semibold">
            Blog
          </Link>
          {!username ? (
            <Link
              href="/enter"
              className="relative px-6 py-3 font-bold text-[#CAD2c5] group"
            >
              <span className="absolute inset-0 w-full h-14 transition duration-300 ease-out transform translate-x-2 -translate-y-2 bg-[#354F52] group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="absolute inset-0 w-full h-14 border-4 border-black"></span>
              <span className="relative">Login</span>
            </Link>
          ) : (
            <>
              <Link href="/admin">
                <button className="relative inline-flex items-center justify-start px-6 py-4 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
                  <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#52796F] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-[#52796F] transition-colors duration-300 ease-in-out group-hover:text-white">
                    Create Post
                  </span>
                </button>
              </Link>
              <SignOutButton />
              <Link href={`/${username}`}>
                <img
                  src={user?.photoURL}
                  className="rounded-[50%] w-[50px] h-[50px] cursor-pointer"
                />
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}
