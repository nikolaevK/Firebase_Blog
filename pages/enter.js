import { useRouter } from "next/router";
import React, { useContext } from "react";
import CreateUsername from "../components/CreateUsername";
import SignInButton from "../components/SignInButton";
import { UserContext } from "../context/context";

export default function EnterPage() {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  if (user && username) {
    router.push("/blog");
  }

  return (
    <main className="text-black">
      {user ? !username ? <CreateUsername /> : <div></div> : <SignInButton />}
    </main>
  );
}
