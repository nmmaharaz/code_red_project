"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGroupInfo } from "./CommunityUserInfo";
import useGroupUserInfo from "./GroupUserInfo";
import { useSession } from "next-auth/react";

function MemberTab() {
  const [activeTab, setActiveTab] = useState("All");
  const pathname = usePathname()
  const router = useRouter();
  const session = useSession()
  const path = pathname.split("/")[2]
  const currentTab = pathname.split("/")[4];
  const tab = ["All", "Request", "Invited"];

  useEffect(() => {
    if (!currentTab) {
      router.replace(`/community/${path}/Member/All`);
    } else {
      setActiveTab(currentTab);
    }
  }, [currentTab, path, router]);

  const { data } = useGroupInfo(path)

  const userInfo = useGroupUserInfo(path, session?.data?.user?.email)
  const tabs = userInfo?.accessibility === "Owner" || userInfo?.accessibility === "Admin" ? tab : tab.slice(0, 1);
  return (
    <div className="border-b border-gray-300">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <Link href={`/community/${path}/Member/${tab}`}
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 text-sm font-semibold ${activeTab === tab
              ? "text-blue-600 border-b-4 border-blue-600"
              : "text-gray-500"
              }`}
          >

            <p className="flex items-center">{tab}{tab === "Request" ? <p className="pl-1 text-red-400">({data[0]?.Request_members?.length})</p> : ""}</p>

          </Link>
        ))}
      </div>
    </div>
  );
}

export default MemberTab;
