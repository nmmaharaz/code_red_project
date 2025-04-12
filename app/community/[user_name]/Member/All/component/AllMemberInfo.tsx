"use client"
import { usePathname } from "next/navigation"
import { useGroupInfo } from "../../component/CommunityUserInfo"
import ShowAllMemberInfo from "./ShowAllMemberInfo"

function AllMemberInfo() {
    const pathname=  usePathname()
    const path =pathname.split("/")[2]
      const {data, isLoading, refetch} = useGroupInfo(path)
  return (
    <div>
        <ShowAllMemberInfo data={data} isLoading={isLoading} refetch={refetch}></ShowAllMemberInfo>
    </div>
  )
}

export default AllMemberInfo