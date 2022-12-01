import Link from "next/link";
import { useContext } from "react";
import { AiFillHeart, AiFillLike, AiOutlineSafety } from "react-icons/ai";
import { UserContext } from "../context/context";
import { BsCardImage } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <main className="bg-[#cad2C5] min-h-screen h-full pt-[7rem] md:pt-[15rem]">
      <section className="flex justify-center w-[100%] md:w-[98%] lg:w-[70%] m-auto py-10 text-center font-Sono text-[#52796F] text-5xl">
        <div className="flex flex-col items-center m-auto md:px-12">
          <p>Create a blog and share your story in minutes</p>
          <p className="text-[1.5rem] pt-8 w-[70%] mb-4 md:mb-0">
            You can sign in with your Google email and start your own blog.
          </p>
          {!user && (
            <Link href="/enter">
              <button className="relative items-center justify-center inline-block text-2xl p-4 px-5 py-3 mt-10 overflow-hidden rounded-lg shadow-2xl group">
                <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-[#84A98c] rounded-full blur-md ease"></span>
                <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                  <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-[#354f52] rounded-full blur-md"></span>
                  <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-[#52796F] rounded-full blur-md"></span>
                </span>
                <span className="relative flex gap-2 text-white">
                  <Image
                    src={"/google.png"}
                    width={30}
                    height={30}
                    alt="landing button"
                  />{" "}
                  Start Now
                </span>
              </button>
            </Link>
          )}
        </div>
      </section>
      <section className="font-Sono">
        <div className="flex flex-col items-center h-[30rem] bg-[#52796F] mt-[6rem]">
          <p className="pt-12 text-xl md:text-2xl text-white">
            Participate in your community
          </p>
          <div className="bg-white w-[90%] md:w-[65%] h-[50%] rounded-md mt-10">
            <div className="flex items-center gap-2 w-full h-8 pl-2 bg-[#354f52] rounded-t-md">
              <div className="navbar-circles bg-[#cad2c5]"></div>
              <div className="navbar-circles bg-[#84a98c]"></div>
              <div className="navbar-circles bg-[#52796f]"></div>
            </div>
            <section className="text-white">
              <div className="flex justify-between items-center w-[90%] h-16 m-auto mt-8 px-6 bg-[#84a98c] rounded-md">
                <span>How to stay productive</span>
                <AiFillHeart className="text-red-500" />
              </div>
              <div className="flex justify-between items-center w-[90%] h-16 m-auto mt-4 px-6 bg-[#84a98c] rounded-md">
                <span>Learn more by doing less</span>
                <AiFillHeart className="text-red-500" />
              </div>
            </section>
          </div>
        </div>
      </section>
      <section className="flex flex-col h-[40rem] bg-inherit font-Sono text-[#52796f] w-[90%] mx-auto">
        <div className="flex justify-center items-center pt-10 text-4xl text-center w-[95%] md:w-[70%] lg:w-[60%] mx-auto">
          <p className="md:px-10">Make your blog interesting and interactive</p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 md:gap-x-[10rem] gap-y-4 mx-auto mt-10 text-xs md:text-lg">
          <div>
            <BsCardImage className="h-16 w-16" />
            <p className="font-semibold">Add Images to your blog</p>
            <div className="md:w-[20rem]">
              Share your experiences and add images to make your story more
              impactful.
            </div>
          </div>
          <div>
            <AiFillLike className="h-16 w-16" />
            <p className="font-semibold">Like posts</p>
            <div className="md:w-[20rem]">
              Show your interest and support by liking other posts on the
              platform.
            </div>
          </div>
          <div>
            <FaComment className="h-16 w-16" />
            <p className="font-semibold">Feed back</p>
            <div className="w-[10rem] md:w-[20rem]">
              The platform provides realtime comments by other users, together
              with ability to use emoji to express your emotions.
            </div>
          </div>
          <div>
            <AiOutlineSafety className="h-16 w-16" />
            <p className="font-semibold">Safety of your data</p>
            <div className="md:w-[20rem]">
              The platform uses firebase security rules to protect your account
              from being accessed by other users.
            </div>
          </div>
        </div>
      </section>
      <section className="font-Sono">
        <div className="flex flex-col items-center h-[30rem] bg-[#52796F] md:mt-[3rem]">
          <p className="pt-20 text-3xl text-center md:text-5xl text-white">
            Start blogging with us today
          </p>
          {!user && (
            <Link href="/enter">
              <button className="relative items-center justify-center inline-block text-2xl p-4 px-5 py-3 mt-24 overflow-hidden rounded-lg shadow-2xl group">
                <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-[#84A98c] rounded-full blur-md ease"></span>
                <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                  <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-[#354f52] rounded-full blur-md"></span>
                  <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-[#52796F] rounded-full blur-md"></span>
                </span>
                <span className="relative flex gap-2 text-white">
                  <Image
                    src={"/google.png"}
                    width={30}
                    height={30}
                    alt="landing button"
                  />{" "}
                  Start Now
                </span>
              </button>
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
