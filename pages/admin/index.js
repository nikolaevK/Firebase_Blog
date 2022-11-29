import React from "react";
import AdminPosts from "../../components/admincomponents/AdminPosts";
import CreateNewPost from "../../components/admincomponents/CreateNewPost";
import SignedInCheck from "../../components/admincomponents/SignedInCheck";

export default function PostPage(props) {
  return (
    <main className="bg-[#CAD2C5] py-[15rem] h-screen">
      <SignedInCheck>
        <AdminPosts />
        <CreateNewPost />
      </SignedInCheck>
    </main>
  );
}
