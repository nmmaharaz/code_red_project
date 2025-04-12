import Image from "next/image";

function ShowAllAdmin({ members }) {
  return (
    <div>
      <div className="bg-white mt-4 px-4 py-2 shadow-sm rounded-md">
        {members?.All_Admin?.map((owner, index) => (
          <div className="flex border-b border-gray-300 items-center justify-between" key={index}>
            <div className="flex py-3 items-center">
              <Image
                src={
                  owner?.user_photo
                    ? owner?.user_photo
                    : "https://placehold.co/400x400"
                }
                alt={owner?.name}
                height={40}
                width={40}
                className="h-[40px] w-[40px] rounded-full"
              ></Image>
              <div className="flex ml-8 flex-col">
                <p className="text-gray-700 font-semibold">{owner?.name}</p>
                <p className="text-sm text-gray-500">{owner?.email}</p>
              </div>
            </div>
            <div>
              <p className="text-center bg-green-300 text-white py-1 px-3 rounded-md mr-4">
                {owner?.accessibility}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowAllAdmin;
