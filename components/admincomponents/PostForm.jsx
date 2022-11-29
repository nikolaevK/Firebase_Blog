import { serverTimestamp, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import ImageUploader from "./ImageUploader";

export default function PostForm({ defaultValues, postRef, preview }) {
  const router = useRouter();
  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { isValid, isDirty, errors } = formState;

  const updatePost = async ({ content, published }) => {
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });
    toast.success("Post updated successfully!");
    router.push("/admin");
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="p-8 my-4 bg-[#CAD2C5] border-2 border-[#354F52] rounded-md overflow-auto">
          <ReactMarkdown className="w-full prose h-[60vh] text-[1.25rem] rounded-sm py-2 px-4">
            {watch("content")}
          </ReactMarkdown>
        </div>
      )}

      <div className={preview ? "hidden" : "flex flex-col"}>
        <ImageUploader />
        <textarea
          name="content"
          className="w-full h-[60vh] text-[1.25rem] overflow-auto bg-[#CAD2C5] border-2 border-[#354F52] text-[#354F52] rounded-md py-2 px-4 focus:border-none focus:outline-none focus:ring focus:ring-[#354F52]"
          {...register("content", {
            maxLength: { value: 20000, message: "content is too long" },
            minLength: { value: 10, message: "content is too short" },
            required: { value: true, message: "content is required" },
          })}
        ></textarea>

        <fieldset className="mt-2">
          <input
            className="h-6 w-6 cursor-pointer rounded-full focus:ring-[#354F52] bg-[#84A98C] checked:bg-[#354F52] border-[#354F52] "
            type="checkbox"
            {...register("published")}
          />
          <label className="text-md pl-2">Published</label>
        </fieldset>
        {errors.content && (
          <p className="text-red-500 mt-2">{errors.content.message}</p>
        )}
        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className="relative px-5 py-3 mt-4 overflow-hidden font-medium text-[#52796F] bg-[#CAD2C5] border-2 border-[#354F52] rounded-lg shadow-inner group"
        >
          <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
          <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
          <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#52796F] opacity-0 group-hover:opacity-100"></span>
          <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
            Post
          </span>
        </button>
      </div>
    </form>
  );
}
