import {
  getDownloadURL,
  getStorage,
  ref as StorageRef,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../firebase/firebase";

export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [downloadedURL, setDownloadedURL] = useState(null);
  const [progress, setProgress] = useState("0");

  const router = useRouter();
  const { slug } = router.query;

  async function uploadFile(e) {
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split("/")[0];

    const storage = getStorage();

    const storageRef = StorageRef(
      storage,
      `uploads/${auth?.currentUser?.uid}/${slug}.${extension}`
    );

    setUploading(true);

    const uploadImg = uploadBytesResumable(storageRef, file);

    uploadImg.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log("Error", error);
      },
      () => {
        getDownloadURL(uploadImg.snapshot.ref).then((downloadURL) => {
          setDownloadedURL(downloadURL);
          setUploading(false);
        });
      }
    );
  }

  return (
    <div className="mb-4 md:my-6 flex justify-between">
      {uploading && <h3>{progress}%</h3>}
      {!uploading && (
        <>
          <label className="bg-[#354F52] text-white py-3 px-8 rounded-md cursor-pointer self-center hover:opacity-90">
            Upload Img
            <input
              className="hidden"
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </label>
        </>
      )}
      {downloadedURL && (
        <code className="w-[75%] ml-auto bg-[#CAD2C5] p-1 my-1 overflow-auto border-2 border-[#354F52]">{`![alt](${downloadedURL})`}</code>
      )}
    </div>
  );
}
