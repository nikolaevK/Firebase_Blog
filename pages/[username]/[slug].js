import {
  collection,
  collectionGroup,
  getDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import PostContent from "../../components/usercomponents/PostContent";
import { db, getUserWithUsername, postToJSON } from "../../firebase/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import SignedInCheck from "../../components/admincomponents/SignedInCheck";
import Link from "next/link";
import LikeButton from "../../components/usercomponents/LikeButton";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { useState } from "react";
import CommentModal from "../../components/usercomponents/CommentModal";
import Comments from "../../components/usercomponents/Comments";

export default function PostPage({ path, post: Post }) {
  const [isOpen, setIsOpen] = useState(false);
  const postRef = doc(db, path);
  const [realTimePost] = useDocumentData(postRef);
  // During the prerender process, post is used
  // When like is clicked, firebase is updated so is realtime post that needs to show the like
  const post = realTimePost || Post;
  return (
    <main className="pt-[15rem] min-h-screen h-full pb-24 bg-[#cad2c5] ">
      <section className="w-[90%] bg-white m-auto rounded-md py-8 px-4 shadow-[20px_20px_60px_#878787]">
        <PostContent post={post} />
        <aside className="flex gap-1 mt-4">
          <span>{post?.heartCount || 0}</span>
          {post?.heartCount > 1 ? <span>likes</span> : <span>like</span>}
          <SignedInCheck
            fallback={
              <Link href="/enter">
                <button>
                  <AiOutlineHeart className="h-5 w-5 pt-1" />
                </button>
              </Link>
            }
          >
            <LikeButton postRef={postRef} />
            <AiOutlineComment
              className="h-5 w-5 mt-[3px] hover:cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
              <CommentModal isOpen={isOpen} setIsOpen={setIsOpen} post={post} />
            )}
          </SignedInCheck>
        </aside>
      </section>
      <Comments postRef={postRef} slug={post?.slug} />
    </main>
  );
}

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);
  let post;
  let path;

  if (userDoc) {
    const postRef = collection(userDoc.ref, "posts");
    const docRef = doc(postRef, slug);
    post = postToJSON(await getDoc(docRef));
    path = docRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

// Gets all the posts from database and defines a list of paths to be statically generated.
// Then sends one of the paths to getStaticProps,(page with dynamic routes) and provides data relevant to that page.
export async function getStaticPaths() {
  const docsRef = query(collectionGroup(db, "posts"));
  const snapshot = await getDocs(docsRef);
  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}
