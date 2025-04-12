"use client"
import Image from 'next/image';
import { FaCheck, FaPlus, FaEllipsisH } from 'react-icons/fa';
import GroupTab from './GroupTab';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useGroupInfo } from '../Member/component/CommunityUserInfo';
import InviteFriend from './InviteFriend';

export default function GroupHeader() {
  const pathname =  usePathname()
  const path = pathname.split("/")[2]
  const session = useSession()
  const {data} = useGroupInfo(path, session?.data?.user?.email)
  const groupInfo = data[0]
  console.log(data[0], "data")
  // if(isLoading)return <p>Loading............</p>
  // if(!session?.data?.user?.email)return <p>loading......</p>
  return (
    <div className="bg-white rounded-lg mb-6 p-6 w-full mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image src={groupInfo?.group_picture ? groupInfo?.group_picture: "https://placehold.co/400x150"} alt="Apple Education" className='h-[50px] w-[50px] object-cover rounded-lg' width={50} height={50} />
          <div className="ml-3">
            <h2 className="font-bold text-xl">{groupInfo?.group_name} <span className="text-green-500">✔</span></h2>
            <p className="text-sm text-gray-500">{groupInfo?.audience} · 28.3K members</p>

            <div className="flex mt-2">
              {groupInfo?.All_Member.slice(0,4).map((member, i) => (
                <Image key={i} src={member?.user_photo?member?.user_photo:"https://placehold.co/30"} alt="User Avatar" width={30} height={30} className="rounded-full border-2 border-white -ml-2 first:ml-0" />
              ))}
              <span className="text-xs text-gray-600 ml-2">+{groupInfo?.All_Member.length>5 ? groupInfo?.All_Member.length-5:0}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-x-2 text-sm">
            <FaCheck /> Joined
          </button>
          <button onClick={()=>document.getElementById("invite_friend").showModal()} className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-x-2 text-sm">
            <FaPlus /> Invite
          </button>
          <button className="bg-gray-200 text-gray-600 p-2 rounded-lg">
            <FaEllipsisH />
          </button>
        </div>
        <InviteFriend></InviteFriend>
      </div>
      <GroupTab></GroupTab>
    </div>
  );
}
