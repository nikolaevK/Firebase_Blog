import {
  limit,
  where,
  orderBy,
  query,
  collection,
  getDocs,
} from "firebase/firestore";
import React from "react";
import UserProfile from "../../components/usercomponents/UserProfile";
import UsersPostFeed from "../../components/usercomponents/UsersPostFeed";
import { getUserWithUsername, postToJSON } from "../../firebase/firebase";

export default function UserPublishedPostsPage({ user, posts }) {
  return (
    <main className="h-screen pt-[8rem] md:pt-[13rem] bg-[#cad2C5]">
      <UserProfile user={user} />
      <UsersPostFeed posts={posts} />
    </main>
  );
}

export async function getServerSideProps({ query: Query }) {
  // takes username from pages [username]
  const { username } = Query;

  const userDoc = await getUserWithUsername(username);
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsRef = collection(userDoc.ref, "posts");
    const q = query(
      postsRef,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    posts = (await getDocs(q)).docs.map(postToJSON);
  }
  return {
    props: {
      user,
      posts,
    },
  };
}
