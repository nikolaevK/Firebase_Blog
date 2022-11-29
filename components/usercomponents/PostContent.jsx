import { format } from "date-fns";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function PostContent({ post }) {
  let datePosted;
  if (post.createdAt?.seconds) {
    const miliseconds =
      (post.createdAt?.seconds + post.createdAt?.nanoseconds * 0.00000001) *
      1000;
    datePosted = format(miliseconds, "PPPP");
  } else if (post.createdAt) {
    datePosted = format(post.createdAt, "PPPP");
  } else {
    datePosted = "Time Unavailable";
  }

  return (
    <div>
      <h1 className="font-bold text-xl mb-4">{post?.title}</h1>
      <span>
        Written by{" "}
        <Link href={`/${post?.username}/`}>
          <strong className="font-bold">@{post?.username}</strong>
        </Link>{" "}
        on {datePosted}
      </span>
      <ReactMarkdown className="mt-4 prose">{post?.content}</ReactMarkdown>
    </div>
  );
}
