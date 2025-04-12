"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

function GroupPostModal() {
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  // const [groupName, setGroupName] = useState<string>("");
  console.log(preview)
  const { data } = useSession();
  useEffect(() => {
    const dropzone = dropzoneRef.current;
    const fileInput = fileInputRef.current;

    if (!dropzone || !fileInput) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      dropzone.classList.add("border-indigo-600");
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dropzone.classList.remove("border-indigo-600");
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      dropzone.classList.remove("border-indigo-600");
      if (e.dataTransfer.files.length > 0) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    };

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        handleFileSelect(target.files[0]);
      }
    };

    const handleFileSelect = (file: File) => {
      if (file && file.type.startsWith("image/")) {
        displayPreview(file);
        uploadImage(file);
      } else {
        toast.error("Please upload a valid image file (PNG, JPG, or GIF).");
      }
    };

    const displayPreview = (file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result as string);
      };
    };

    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("dragleave", handleDragLeave);
    dropzone.addEventListener("drop", handleDrop);
    fileInput.addEventListener("change", handleFileChange);

    return () => {
      dropzone.removeEventListener("dragover", handleDragOver);
      dropzone.removeEventListener("dragleave", handleDragLeave);
      dropzone.removeEventListener("drop", handleDrop);
      fileInput.removeEventListener("change", handleFileChange);
    };
  }, []);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=57138238c8443d7277af5c2feeb31321",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const uploadedUrl = response.data.data.url;

      const shortenedUrl = await shortenUrl(uploadedUrl);

      setPreviewSrc(shortenedUrl);
      return shortenedUrl;
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed.");
      return null;
    }
  };

  const shortenUrl = async (longUrl: string) => {
    try {
      const response = await axios.post(
        "https://api-ssl.bitly.com/v4/shorten",
        { long_url: longUrl },
        {
          headers: {
            Authorization: `Bearer YOUR_BITLY_ACCESS_TOKEN`,
          },
        }
      );
      return response.data.link;
    } catch (error) {
      console.error("URL shortening failed", error);
      return longUrl;
    }
  };

  const userInfo = axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${data?.user?.email}`
  );
  console.log(userInfo, "use info");

  return (
    <dialog id="group_post_modal" className="modal modal-middle">
      <form
        // onSubmit={handleCommunityCreate}
        className="fixed inset-0 flex justify-center items-center p-4"
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          <button
            type="button"
            onClick={() => document.getElementById("group_post_modal")?.close()}
            className="text-gray-500 hover:text-gray-700 absolute top-3 right-3"
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold mb-4">Create Group</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={
                  userInfo?.data?.user_photo
                    ? userInfo?.data?.user_photo
                    : "https://placehold.co/40x40"
                }
                alt="User avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <input
                type="text"
                placeholder="Share your thoughts..."
                className="flex-1 bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex flex-col items-center">
                <div
                  ref={dropzoneRef}
                  className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg bg-blue-50 text-gray-600 text-center font-semibold px-4 py-2 w-full text-sm inline-block relative overflow-hidden"
                >
                  Upload attachment
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/png, image/jpeg, image/gif"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                <div className="min-h-[200px] mt-3 border-2 border-dashed border-gray-300 rounded-lg w-full">
                  {previewSrc && (
                    <div className="relative">
                      <Image
                        src={previewSrc}
                        alt="Group Picture"
                        width={400}
                        height={400}
                        className="object-fill border"
                      />
                      <button
                        onClick={() => setPreviewSrc(null)}
                        className="absolute top-0 right-0 bg-gray-700 text-white text-xs rounded-full px-2"
                      >
                        ✖
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-x-4 justify-end">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("group_post_modal")?.close()
                }
                className="bg-red-100 hover:bg-red-600 text-red-600 hover:text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  // You can also add your post logic here before closing
                  document.getElementById("group_post_modal")?.close();
                }}
                className="bg-green-100 hover:bg-green-600 text-green-700 hover:text-white px-4 py-2 rounded"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </dialog>
  );
}

export default GroupPostModal;
