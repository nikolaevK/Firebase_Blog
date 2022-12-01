import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";
import { format } from "date-fns";
import { AiOutlineComment } from "react-icons/ai";

const PostItem = ({ post }) => {
  const [admin, setAdmin] = useState(false);
  const { username } = useContext(UserContext);
  const wordCount = post?.content?.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  useEffect(() => {
    if (username === post.username) {
      setAdmin(true);
    }
  }, [post]);

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
    <div className="w-[90%] bg-white text-[#52796F] py-6 px-2 md:px-4 align-middle m-auto mb-2 rounded-md shadow-[20px_20px_60px_#878787] hover:scale-105 transition ease-out delay-75">
      <div className="flex gap-2 md:gap-6 text-xs md:text-lg">
        {datePosted && <span>{datePosted}</span>}
        <span className="text-gray-400">
          {wordCount} words. {minutesToRead} min read
        </span>
      </div>

      <div className="flex justify-between">
        <Link href={`/${post.username}/${post.slug}`}>
          <h2 className="my-3 font-bold">{post.title}</h2>
        </Link>
        <span className="flex justify-center items-center gap-2 md:text-xl">
          <span className="flex gap-1 ">
            <span>{post.heartCount || 0}</span>
            {post?.heartCount > 1 ? <span>likes</span> : <span>like</span>}
          </span>

          <span className="flex">
            <Link href={`/${post.username}/${post.slug}`}>
              <AiOutlineComment className="h-6 w-6 cursor-pointer" />
            </Link>

            <span>{post?.commentCount}</span>
          </span>
        </span>
      </div>

      <footer className="flex justify-between font-semibold">
        <Link href={`/${post.username}`}>
          <strong>By @{post.username}</strong>
        </Link>
      </footer>

      {/* If admin, show extra controls for that user */}
      {admin && (
        <div className="flex gap-2 mt-2">
          <Link href={`/admin/${post.slug}`}>
            <button className="relative inline-flex items-center justify-center px-2 py-1 md:px-4 md:py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-[#354F52] rounded-lg group">
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#52796F] rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent"></span>
              <span className="relative">Edit</span>
            </button>
          </Link>

          {post.published ? (
            <p className="text-green-500 mt-1 md:mt-2">Live</p>
          ) : (
            <p className="text-red-600 mt-1 md:mt-2">Unpublished</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostItem;
