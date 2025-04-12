"use client"
import { usePathname } from "next/navigation"
import { useGroupInfo } from "../../component/CommunityUserInfo"
import ShowInvitedMember from "./ShowInvitedMember"

function InviteMemberInfo() {
  const pathname = usePathname()
  const path = pathname.split("/")[2]
  const { data, refetch } = useGroupInfo(path)
  console.log(data)
  return (
    <div>
      <ShowInvitedMember data={data} refetch={refetch}></ShowInvitedMember>
    </div>
  )
}

export default InviteMemberInfo