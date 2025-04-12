"use client";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaPhotoVideo, FaSmile, FaVideo } from "react-icons/fa";
import GroupPostModal from "./GroupPostModal";

export default function PostInputCard() {
  const { data } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (data?.user?.email) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${data.user.email}`)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch user info", err);
        });
    }
  }, [data?.user?.email]);
  // const openModal = () => {
  //   const dialog = document.getElementById("show_group_post") as HTMLDialogElement;
  //   dialog?.showModal();
  // };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow p-4 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Image
          src={
            userInfo?.user_photo
              ? userInfo.user_photo
              : "https://placehold.co/40x40"
          }
          alt="User avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <input
          onClick={()=>document.getElementById('group_post_modal').showModal()}
          type="text"
          placeholder="Share your thoughts..."
          className="flex-1 bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none"
        />
      </div>

      <div
        onClick={()=>document.getElementById('group_post_modal').showModal()}
        className="flex items-center justify-between flex-wrap gap-2"
      >
        <div className="flex gap-2 flex-wrap">
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1.5 rounded-lg text-gray-700">
            <FaPhotoVideo className="text-green-500" />
            Photo
          </button>
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1.5 rounded-lg text-gray-700">
            <FaVideo className="text-blue-500" />
            Video
          </button>
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1.5 rounded-lg text-gray-700">
            <FaCalendarAlt className="text-red-500" />
            Event
          </button>
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1.5 rounded-lg text-gray-700">
            <FaSmile className="text-yellow-500" />
            Feeling /Activity
          </button>
        </div>
        <GroupPostModal></GroupPostModal>
      </div>
    </div>
  );
}
