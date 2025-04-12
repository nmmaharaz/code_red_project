import axios from "axios";
import Image from "next/image";

function ShowRequestInfo({ data, refetch }) {
  const request = data[0];
  const handleAccepted = async (req) => {
    // if (!req?.accessibility === "Owner" || !req?.accessibility === "Admin") {
    //   return;
    // }
    await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/communities/${req?.group_user_name}`, {
      member: req?.name
    });
    refetch()
  };
  const handleDelete = async (req) => {
    // if (!req?.accessibility === "Owner" || !req?.accessibility === "Admin") {
    //   return;
    // }
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/communities/${req?.group_user_name}`, {
      headers:  {member:req?.name} ,
  });
    refetch()
  };

  return (
    <div className="bg-white mt-4 px-4 py-2 shadow-sm rounded-md">
      {request?.Request_members?.map((req, index) => (
        <div
          className="flex py-3 border-b border-gray-300 items-center justify-between"
          key={index}
        >
          <div className="flex items-center">
            <Image
              src={
                req?.user_photo
                  ? req?.user_photo
                  : "https://placehold.co/400x400"
              }
              alt={req?.name}
              height={40}
              width={40}
              className="h-[40px] w-[40px] rounded-full"
            ></Image>
            <div className="flex ml-8 flex-col">
              <p className="font-semibold text-gray-700">{req?.name}</p>
              <p className="text-sm text-gray-500">{req?.email}</p>
            </div>
          </div>
          <div>
            <p className="text-center bg-orange-300 text-white py-1 px-3 rounded-md text-sm mr-4">
              {req?.accessibility}
            </p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handleAccepted(req)}
              className="text-center bg-green-500 text-white font-semibold text-sm py-1 px-3 rounded-md mr-4"
            >
              Accept
            </button>
            <button onClick={()=>handleDelete(req)} className="text-center bg-red-500 text-white font-semibold text-sm py-1 px-3 rounded-md mr-4">
              Cencel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowRequestInfo;
