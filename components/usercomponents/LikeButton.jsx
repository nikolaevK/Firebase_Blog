import { collection, doc, writeBatch, increment } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/router";

export default function LikeButton({ postRef }) {
  const heartRef = collection(postRef, "hearts");
  const HeartDocRef = doc(heartRef, auth?.currentUser?.uid);
  const [Doc] = useDocument(HeartDocRef);

  const router = useRouter();
  const { slug } = router.query;

  async function addLike() {
    const uid = auth?.currentUser?.uid;
    const batch = writeBatch(db);

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(HeartDocRef, { uid, slug });

    await batch.commit();
  }

  async function removeLike() {
    const batch = writeBatch(db);

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(HeartDocRef);

    await batch.commit();
  }

  return Doc?.exists() ? (
    <button onClick={removeLike}>
      <AiFillHeart className="text-red-500 h-5 w-5" />
    </button>
  ) : (
    <button onClick={addLike}>
      <AiOutlineHeart className=" h-5 w-5" />
    </button>
  );
}
