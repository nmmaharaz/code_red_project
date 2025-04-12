import Image from "next/image"

function ShowMember({ members }) {
  return (
    <div>
      <div className="bg-white mt-4 px-4 py-2 shadow-sm rounded-md">
        {members?.All_Member?.map((member, index) => (
          <div className="flex py-3 border-b border-gray-300 items-center justify-between" key={index}>
            <div className="flex items-center">
              <Image
                src={
                  member?.user_photo
                    ? member?.user_photo
                    : "https://placehold.co/400x400"
                }
                alt={member?.name}
                height={40}
                width={40}
                className="h-[40px] w-[40px] rounded-full"
              ></Image>
              <div className="flex ml-8 flex-col">
                <p className="font-semibold text-gray-700">{member?.name}</p>
                <p className="text-sm text-gray-500">{member?.email}</p>
              </div>
            </div>
            <div>
              <p className="text-center bg-orange-300 text-white py-1 px-3 rounded-md mr-4">{member?.accessibility}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowMember