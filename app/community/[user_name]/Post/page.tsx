// "use client"
import GroupAboutCard from "./component/GroupAboutCard"
import GroupPostLeftSideBar from "./component/GroupPostLeftSideBar"

function GroupPostPage() {
  return (
    <div className="flex gap-4">
        <div className="w-4/6">
            <GroupPostLeftSideBar></GroupPostLeftSideBar>
        </div>
        <div className="w-2/6">
            <GroupAboutCard></GroupAboutCard>
        </div>
    </div>
  )
}

export default GroupPostPage