import Link from "next/link";
import { format } from "date-fns";
import { UserContext } from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  increment,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function Comment({ comment, postRef, slug }) {
  const [admin, setAdmin] = useState(false);
  const { username, user } = useContext(UserContext);
  const timestamp = comment?.createdAt?.toMillis();

  useEffect(() => {
    if (username === comment.username) {
      setAdmin(true);
    }
  }, [comment]);

  async function deleteComment(comment) {
    const commentRef = collection(postRef, "comments");
    const q = query(commentRef, where("comment", "==", comment));

    (await getDocs(q)).docs.forEach((doc) => deleteDoc(doc.ref));

    const docRef = doc(db, "users", user.uid, "posts", slug);
    await updateDoc(docRef, {
      commentCount: increment(-1),
    });
  }

  return (
    <section className="relative w-[90%] bg-[#cad2c5] mx-auto rounded-md py-4 px-4">
      <div className="flex gap-2 text-[#354f52]">
        <img src={comment.photoURL} className="h-10 w-10 rounded-full" />
        <Link href={`/${comment.username}`}>
          <span className="font-bold">@{comment.username}</span> -
        </Link>
        {timestamp && (
          <span className="text-gray-500">{format(timestamp, "PPp")}</span>
        )}
      </div>
      <span className="ml-[6%]">{comment.comment}</span>
      {admin && (
        <RiDeleteBinLine
          onClick={() => deleteComment(comment.comment)}
          className="absolute top-[40%] right-10 h-5 w-5 cursor-pointer"
        />
      )}
    </section>
  );
}
