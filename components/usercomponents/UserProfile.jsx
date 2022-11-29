import Image from "next/image";

export default function UserProfile({ user }) {
  return (
    <section className="flex flex-col items-center h-40 mb-10">
      <Image
        height={30}
        width={30}
        alt="profile icon"
        src={user?.photoURL}
        className="h-16 w-16 rounded-full mb-4 shadow-[15px_15px_40px_#7d827a]"
      />
      <span>@{user?.username}</span>
      <h1 className="mt-6 font-bold text-xl">{user?.displayName}</h1>
    </section>
  );
}
