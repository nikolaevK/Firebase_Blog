import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { SiBloglovin } from "react-icons/si";
import SignOutButton from "./SignOutButton";

export default function MobileNav({ user, username }) {
  const [showNav, setShowNav] = useState(false);

  return (
    <nav className="fixed top-0 h-16 w-full bg-white shadow-[5px_5px_10px_#878787] z-50">
      <div className="flex justify-between px-5 py-5">
        <Link href="/">
          <SiBloglovin className="h-8 w-8" />{" "}
        </Link>
        <button
          onClick={() => setShowNav(!showNav)}
          class="space-y-2 font-bold"
        >
          <div class="w-8 h-0.5 bg-black"></div>
          <div class="w-8 h-0.5 bg-black"></div>
          <div class="w-8 h-0.5 bg-black"></div>
        </button>
      </div>
      {showNav && (
        <section className="h-screen w-screen backdrop-blur-lg mt-[-.5rem] z-50">
          <div className="flex flex-col items-center gap-5 pt-[30%] text-[#52796F]">
            {username && (
              <Link href={`/${username}`}>
                <div onClick={() => setShowNav(!showNav)}>
                  <Image
                    src={user?.photoURL}
                    className="rounded-[50%] mb-16"
                    width={70}
                    height={70}
                    alt="Nav icon"
                  />
                </div>
              </Link>
            )}
            <div onClick={() => setShowNav(!showNav)}>
              <Link href="/blog" className="text-2xl underline">
                Blog
              </Link>
            </div>

            {!username ? (
              <Link
                onClick={() => setShowNav(!showNav)}
                href="/enter"
                className="relative px-6 py-3 font-bold text-[#CAD2c5] group mt-4"
              >
                <span className="absolute inset-0 w-full h-14 transition duration-300 ease-out transform translate-x-2 -translate-y-2 bg-[#354F52] group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute inset-0 w-full h-14 border-4 border-black"></span>
                <span className="relative">Login</span>
              </Link>
            ) : (
              <>
                <div className="mb-8" onClick={() => setShowNav(!showNav)}>
                  <Link href="/admin" className="text-2xl underline">
                    Create Post
                  </Link>
                </div>
                <div onClick={() => setShowNav(!showNav)}>
                  <SignOutButton />
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </nav>
  );
}
