import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../../context/context";
import { getUserWithUsername } from "../../firebase/firebase";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs";
import dynamic from "next/dynamic";
import {
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";

export default function CommentModal({ isOpen, setIsOpen, post }) {
  const [postsOwnerImage, setPostsOwnerImage] = useState();
  const [postsOwnerUsername, setPostsOwnerUsername] = useState();
  const [comment, setComment] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const { user, username } = useContext(UserContext);

  //
  const Picker = dynamic(
    () => import("@emoji-mart/react").then((module) => module.default),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }
  );

  // Accessing info about Owner of the post
  async function getUrlImage() {
    const postsUserDoc = await getUserWithUsername(post?.username);
    const postsUserPhoto = postsUserDoc?.data();
    setPostsOwnerImage(postsUserPhoto?.photoURL);
    setPostsOwnerUsername(postsUserPhoto?.username);
  }

  async function sendComment(e) {
    e.preventDefault();

    const usersPostRef = await getUserWithUsername(post?.username);

    // Creates random id firsts so I can access it
    const newCommentRef = doc(
      collection(usersPostRef.ref, "posts", post.slug, "comments")
    );
    await setDoc(newCommentRef, {
      comment: comment,
      username: username,
      createdAt: serverTimestamp(),
      photoURL: user?.photoURL,
      commentSlug: post.slug,
      uid: user.uid,
      commentId: newCommentRef.id,
    });

    // await addDoc(collection(usersPostRef.ref, "posts", post.slug, "comments"), {
    //   comment: comment,
    //   username: username,
    //   createdAt: serverTimestamp(),
    //   photoURL: user?.photoURL,
    //   commentSlug: post.slug,
    //   uid: user.uid,
    // });

    // add one to commentCount to keep track of the number of comments
    const collectionRef = collection(usersPostRef.ref, "posts");
    const docRef = doc(collectionRef, post.slug);
    updateDoc(docRef, {
      commentCount: increment(1),
    });

    setIsOpen(false);
    setComment("");
  }

  useEffect(() => {
    getUrlImage();
  }, [post]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function addEmoji(e) {
    setComment(comment + e.native);
  }

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={openModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="bg-white h-[20rem] w-[34rem] rounded-xl">
                  <section>
                    <div className="flex justify-end pr-4 pt-4">
                      <AiOutlineClose
                        onClick={closeModal}
                        className="cursor-pointer text-[#52796f] h-5 w-5"
                      />
                    </div>
                    <div className="border-b-[1.5px] border-[#52796f] mt-4"></div>
                  </section>
                  <section className="mt-6">
                    <div className="flex gap-2 items-center ml-4 mt-2 text-[#52796f]">
                      <div className="">
                        <Image
                          width={30}
                          height={30}
                          alt="modal icon"
                          src={postsOwnerImage}
                          className="h-10 w-10 rounded-full"
                        />
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold p-0">{`@${postsOwnerUsername}`}</span>
                        <span>{post?.title}</span>
                      </div>
                    </div>
                  </section>
                  <section className="relative mt-4">
                    <div className="flex items-center ml-4 mt-2 text-[#52796f]">
                      <Image
                        height={30}
                        width={30}
                        alt="comment modal icon"
                        src={user?.photoURL}
                        className="h-10 w-10 rounded-full"
                      />
                      <textarea
                        rows="2"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Comment Here"
                        className="mx-4 border-none bg-[#cad2c5] rounded-lg w-full focus:outline-none focus:ring focus:ring-[#52796f]"
                      />
                    </div>
                    <BsFillEmojiHeartEyesFill
                      className="h-6 w-6 ml-[4.5rem] mt-2 text-yellow-500 hover:cursor-pointer"
                      onClick={() => setOpenEmoji(!openEmoji)}
                    />
                    {openEmoji && (
                      <div className="absolute top-28">
                        <Picker theme="light" onEmojiSelect={addEmoji} />
                      </div>
                    )}
                  </section>
                  <section className="flex justify-end mr-4">
                    <button
                      onClick={sendComment}
                      className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-[#52796F] transition duration-300 ease-out border-2 border-[#52796F] rounded-md shadow-md group"
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#52796F] group-hover:translate-x-0 ease">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-[#52796F] transition-all duration-300 transform group-hover:translate-x-full ease">
                        Send comment
                      </span>
                      <span className="relative invisible">Send comment</span>
                    </button>
                  </section>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
