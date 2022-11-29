import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import { auth, db } from "../../firebase/firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
const kebabCase = require("lodash.kebabcase");

export default function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  const slug = encodeURI(kebabCase(title));
  const isValid = title.length > 3 && title.length < 50;

  async function createPost(e) {
    e.preventDefault();
    const uid = auth?.currentUser?.uid;
    const ref = collection(db, "users", uid, "posts");

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# Write content here!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
      commentCount: 0,
    };

    await setDoc(doc(ref, `${slug}`), data);

    toast.success("Post created!");

    router.push(`/admin/${slug}`);
  }

  return (
    <form onSubmit={createPost} className="w-[90%] m-auto mt-4 mb-32">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Name Your Awesome Article?"
        className="w-full rounded-md py-2 px-4 text-xl border-2 text-[#52796F] border-[#52796F] focus:outline-none focus:ring focus:ring-[#52796F]"
      />
      <button
        type="submit"
        disabled={!isValid}
        className="relative inline-flex items-center justify-center p-4 px-6 py-3 mt-4 overflow-hidden font-medium text-[#52796F] transition duration-300 ease-out border-2 border-[#52796F] rounded-md shadow-md group"
      >
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#52796F] group-hover:translate-x-0 ease">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-[#52796F] transition-all duration-300 transform group-hover:translate-x-full ease">
          Create New Post
        </span>
        <span className="relative invisible">Create New Post</span>
      </button>
    </form>
  );
}
