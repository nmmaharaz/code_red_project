"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useGroupUserInfo from "../Member/component/GroupUserInfo";
import { useSession } from "next-auth/react";

function GroupTab() {
  const [activeTab, setActiveTab] = useState("Post");
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession()
  const pathParts = pathname.split("/");
  const path = pathParts[2];
  const currentTab = pathParts[3];
  const tab = ["Post", "About", "Member", "Post Authorization"];

  useEffect(() => {
    if (!currentTab) {
      router.replace(`/community/${path}/Post`);
    } else {
      setActiveTab(currentTab);
    }
  }, [currentTab, path, router]);
  const userInfo = useGroupUserInfo(path, session?.data?.user?.email)
  const tabs = userInfo?.accessibility === "Owner" || userInfo?.accessibility === "Admin" ? tab : tab.slice(0, 3);
  return (
    <div className="mt-4 border-b border-gray-300">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <Link
            href={`/community/${path}/${tab}`}
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 text-sm font-semibold ${
              activeTab === tab
                ? "text-blue-600 border-b-4 border-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GroupTab;
