"use client"

import { usePathname } from "next/navigation"
import ShowRequestInfo from "./ShowRequestInfo"
import { useGroupInfo } from "../../component/CommunityUserInfo"

function RequestInfo() {
    const pathname=  usePathname()
    const path =pathname.split("/")[2]
      const {data, refetch} = useGroupInfo(path)
      console.log(data)
  return (
    <div>
        <ShowRequestInfo data={data} refetch={refetch}></ShowRequestInfo>
    </div>
  )
}

export default RequestInfo