import {
  collectionGroup,
  deleteDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase/firebase";
import Link from "next/link";
import PostForm from "./PostForm";
import toast from "react-hot-toast";
import { deleteObject, getStorage, ref as StorageRef } from "firebase/storage";

export default function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const userID = auth?.currentUser?.uid;
  const postRef = doc(db, "users", userID, "posts", slug);
  const [post] = useDocumentData(postRef);

  async function deletePost() {
    const batch = writeBatch(db);
    const storage = getStorage();

    // Deletes Comments docs from a particular post
    // const commentRef = query(
    //   collectionGroup(db, "comments"),
    //   where("commentSlug", "==", slug)
    // );
    // (await getDocs(commentRef)).docs.forEach((doc) => {
    //   batch.delete(doc.ref);
    // });

    // const likesRef = query(
    //   collectionGroup(db, "hearts"),
    //   where("slug", "==", slug)
    // );
    // (await getDocs(likesRef)).docs.forEach((doc) => {
    //   batch.delete(doc.ref);
    // });
    // await batch.commit();

    // Deletes User's post
    deleteDoc(postRef).then(() => {
      toast.success("Post deleted successfully");
      router.push("/admin");
    });

    // Checks if user has an image in the post
    // Deletes it from the storage
    if (post.content.includes("![alt]")) {
      const pictureRef = StorageRef(storage, `uploads/${userID}/${slug}.image`);

      deleteObject(pictureRef)
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <main className="w-[90%] min-h-screen m-auto pt-12 pb-12">
      {post && (
        <div className="flex gap-6 text-[#52796F]">
          <section className="w-[60vw]">
            <h1 className="text-[4rem]">{post?.title}</h1>
            <p className="mb-4">ID: {post?.slug}</p>

            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>
          <aside className="text-center flex flex-col w-[20%] min-w-[250px] min-h-[200px] sticky top-[180px] h-0">
            <h3 className="font-semibold mb-2">Tools</h3>
            <button
              onClick={() => setPreview(!preview)}
              className="relative rounded px-5 py-2.5 mb-2 overflow-hidden group bg-[#354f52] hover:bg-gradient-to-r hover:from-[#52796F]  text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#52796F] transition-all ease-out duration-300"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">{preview ? "Edit" : "Preview"}</span>
            </button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="relative w-full rounded px-5 py-2.5 overflow-hidden group bg-[#52796F] hover:bg-gradient-to-r hover:from-[#52796F]  text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#52796F] transition-all ease-out duration-300">
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Live View</span>
              </button>
            </Link>
            <button
              onClick={deletePost}
              className="relative inline-flex items-center justify-start mt-2 px-5 py-2.5 overflow-hidden font-medium transition-all bg-red-500 rounded-md group"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <span className="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                Delete Post
              </span>
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
