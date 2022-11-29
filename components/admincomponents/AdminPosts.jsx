import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import PostItem from "./PostItem";

export default function AdminPosts() {
  let posts;
  async function createPost() {
    if (auth.currentUser?.uid) {
      const admin = auth.currentUser?.uid;
      const ref = collection(db, "users", admin, "posts");
      const q = query(ref, orderBy("createdAt"));

      const [querySnapshot] = useCollection(q);

      posts = querySnapshot?.docs.map((doc) => doc.data());
    }
  }

  createPost();

  return (
    <>
      <h1 className="w-[90%] m-auto mb-2 font-medium text-2xl">
        Manage your Posts
      </h1>
      {posts && posts.map((post) => <PostItem post={post} key={post.slug} />)}
    </>
  );
}
