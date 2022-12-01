import React from "react";
import AdminPosts from "../../components/admincomponents/AdminPosts";
import CreateNewPost from "../../components/admincomponents/CreateNewPost";
import SignedInCheck from "../../components/admincomponents/SignedInCheck";

export default function PostPage() {
  return (
    <main className="bg-[#CAD2C5] py-[8rem] md:py-[15rem] min-h-screen h-fit">
      <SignedInCheck>
        <AdminPosts />
        <CreateNewPost />
      </SignedInCheck>
    </main>
  );
}
