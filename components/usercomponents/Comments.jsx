import { query, orderBy, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Comment from "./Comment";

export default function Comments({ postRef, slug }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (postRef) {
      const commentsRef = collection(postRef, "comments");
      const allCommentsQuery = query(commentsRef, orderBy("createdAt", "desc"));

      unsubscribe = onSnapshot(allCommentsQuery, (snapshot) => {
        const commentArray = [];
        snapshot.forEach((doc) => {
          commentArray.push(doc.data());
        });
        setComments(commentArray);
      });
    } else {
      setComments([]);
    }
    return unsubscribe;
  }, [postRef]);

  return (
    comments.length > 0 && (
      <section className="flex flex-col gap-4 w-[90%] bg-white mx-auto rounded-md mt-8 py-8 px-6 shadow-[20px_20px_60px_#878787]">
        <p className="ml-[5%] mb-2 font-semibold">Comments:</p>
        {comments.map((comment) => (
          <Comment
            comment={comment}
            postRef={postRef}
            slug={slug}
            key={comment.createdAt}
          />
        ))}
      </section>
    )
  );
}
