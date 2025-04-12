import axios from "axios";
import Image from "next/image"

function ShowInvitedMember({data, refetch}) {
    const invited = data[0]
    const handleDelete = async(invite)=>{
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/communities/${invite?.group_user_name}`, {
            headers:  {member:invite?.name} ,
        });
          refetch()
    }
  return (
    <div>
        <div className="bg-white mt-4 px-4 py-2 shadow-sm rounded-md">
              {invited?.Invited_members?.map((invite, index) => (
                <div
                  className="flex py-3 border-b border-gray-300 items-center justify-between"
                  key={index}
                >
                  <div className="flex items-center">
                    <Image
                      src={
                        invite?.user_photo
                          ? invite?.user_photo
                          : "https://placehold.co/400x400"
                      }
                      alt={invite?.name}
                      height={40}
                      width={40}
                      className="h-[40px] w-[40px] rounded-full"
                    ></Image>
                    <div className="flex ml-8 flex-col">
                      <p className="font-semibold text-gray-700">{invite?.name}</p>
                      <p className="text-sm text-gray-500">{invite?.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-center bg-orange-300 text-white py-1 px-3 rounded-md text-sm mr-4">
                      {invite?.accessibility}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button onClick={()=>handleDelete(invite)} className="text-center bg-red-500 text-white font-semibold text-sm py-1 px-3 rounded-md mr-4">
                      Cencel
                    </button>
                  </div>
                </div>
              ))}
            </div>
    </div>
  )
}

export default ShowInvitedMember