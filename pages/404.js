import Link from "next/link";

export default function Custom404() {
  return (
    <main className="flex flex-col justify-center items-center pt-[15rem] bg-[#CAD2C5] h-screen">
      <h1 className="font-bold mb-2">
        404 - This page does not seem to exist...
      </h1>
      <iframe
        src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
        width="480"
        height="362"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Link href="/">
        <button className="relative px-5 py-3 mt-4 overflow-hidden font-medium text-[#52796F] bg-[#CAD2C5] border-2 border-[#354F52] rounded-lg shadow-inner group">
          <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
          <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
          <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#52796F] opacity-0 group-hover:opacity-100"></span>
          <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
            Go Home
          </span>
        </button>
      </Link>
    </main>
  );
}
