"use client";
import Image from "next/image";
import CreateCommunityButton from "./component/CreateCommunityButton";
import Link from "next/link";
import { AllCommunity } from "./component/AllCommunity";
import Loading from "../loading";

const membersImages = [
  "",
  "",
  "",
  "",
];

export default function GroupList() {
  const {groups, isLoading, isError } = AllCommunity()
  if (isLoading) return <Loading></Loading>
  if (isError) return <p>Error loading groups</p>;

  return (
    <div className="max-w-6xl min-h-screen bg-white shadow-lg rounded-lg mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Group</h2>
        <div className="flex space-x-2">
          <select className="border text-gray-700 border-gray-300 rounded px-3 py-2 text-sm">
            <option className="text-gray-700">Alphabetical</option>
          </select>
          <CreateCommunityButton />
        </div>
      </div>

      <div className="border-b border-gray-300 mb-4 flex space-x-4 text-sm">
        <span className="text-blue-600 border-b-2 border-blue-600 pb-2">Friends&apos; groups</span>
        <span className="text-gray-600 font-semibold">Suggested for you</span>
        <span className="text-gray-600 font-semibold">Popular near you</span>
        <span className="text-gray-600 font-semibold">More suggestions</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {groups.map((group, index: number) => (
          <div key={index} className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <div className="relative">
              <Image src={group?.group_picture ? group?.group_picture: "https://placehold.co/400x150"} alt={group.group_name} width={400} height={150} className="opacity-80 w-full h-32 object-cover" />
            </div>
            <div className="text-center pt-4 pb-4 px-4">
              <Link href={`/community/${group?.user_name}`} className="font-semibold text-gray-800 text-lg">{group?.group_name}</Link>
              <p className="text-gray-500 text-sm">{group?.audience}</p>
              <div className="flex justify-center space-x-4 text-gray-600 text-sm mt-2">
                <span>12k Members</span>
                <span>16 Post per day</span>
              </div>
              <div className="flex justify-center -space-x-2 mt-3">
                {membersImages.slice(0, 4).map((img, idx) => (
                  <Image key={idx} src={img ? img : "https://placehold.co/32"} alt="Member" width={32} height={32} className="rounded-full border-2 border-white" />
                ))}
                <span className="h-[32] flex items-center justify-center w-[32] bg-gray-300 text-xs rounded-full px-2 py-1">
                  +{group.extraMembers || 12}
                </span>
              </div>
              <button className={`mt-4 px-4 py-1 rounded ${group.buttonColor || 'bg-blue-100 text-blue-700'} text-sm font-semibold`}>
                {group.buttonText || "Join Group"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
