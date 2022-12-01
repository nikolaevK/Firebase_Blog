import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  Timestamp,
  startAfter,
} from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { db, postToJSON } from "../firebase/firebase";
import UserPostFeed from "../components/usercomponents/UsersPostFeed";

const LIMIT = 4;

export default function BlogsPage({ allPosts }) {
  const [posts, setPosts] = useState(allPosts || []);
  const [postsEnd, setPostsEnd] = useState(false);

  async function loadMorePosts() {
    toast.loading();

    const lastPost = posts[posts.length - 1];

    // Getting the date of the last post to query posts which were made after
    const datePostedOfLastPost =
      typeof lastPost.createdAt === "number"
        ? Timestamp.fromMillis(lastPost.createdAt)
        : lastPost.createdAt;

    const postsRef = query(
      collectionGroup(db, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(datePostedOfLastPost),
      limit(LIMIT)
    );

    const additionalPosts = (await getDocs(postsRef)).docs.map((doc) =>
      doc.data()
    );

    setPosts(posts.concat(additionalPosts));
    toast.dismiss();

    if (additionalPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  }

  return (
    <main className="bg-[#CAD2c5] min-h-screen h-full pt-[7rem] md:pt-[15rem] pb-24">
      <UserPostFeed posts={posts} />
      <div className="w-[90%] m-auto mt-6">
        {!postsEnd && (
          <button
            onClick={loadMorePosts}
            className="relative inline-flex items-center justify-center p-4 px-6 py-2 overflow-hidden font-medium text-[#354f52] transition duration-300 ease-out border-2 border-[#354f52] rounded-full shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#52796f] group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-[#353f52] transition-all duration-300 transform group-hover:translate-x-full ease">
              More Posts
            </span>
            <span className="relative invisible">More Posts</span>
          </button>
        )}
        {postsEnd && <span>You have reached the end!</span>}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const allPostsQuery = query(
    collectionGroup(db, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );

  const allPosts = (await getDocs(allPostsQuery)).docs.map(postToJSON);

  return {
    props: {
      allPosts,
    },
  };
}
