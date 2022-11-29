import Link from "next/link";
import React from "react";
import PostItem from "../admincomponents/PostItem";

export default function UsersPostFeed({ posts }) {
  return posts?.length > 0 ? (
    posts.map((post) => <PostItem key={post.slug} post={post} />)
  ) : (
    <section className="flex justify-center text-black">
      <div className="flex flex-col items-center w-[90%] rounded-md py-4 px-4 shadow-[20px_20px_60px_#acb3a7] ">
        <span className="text-2xl">You have not published anything yet</span>
        <span className="text-xl pt-2 mb-6">Write your first blog!</span>
        <Link href="/admin">
          <button className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-white transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-[#52796f] group">
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[#85a98c] group-hover:h-full"></span>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <svg
                className="w-5 h-5 text-[#354f52]"
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
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg
                className="w-5 h-5 text-[#354f52]"
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
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
              Let's Write
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
}
