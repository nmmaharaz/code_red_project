import Image from "next/image";
import ShowMember from "./ShowMember";
import ShowAllAdmin from "./ShowAllAdmin";

function ShowAllMemberInfo({ data, refetch }) {
  console.log(data[0], "show data");
  const members = data[0];
  return (
    <div className="my-5">
      <div className="bg-white px-4 py-2 shadow-sm rounded-md">
        {members?.Owner?.map((owner, index) => (
          <div className="flex items-center justify-between" key={index}>
            <div className="flex items-center">
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
                <p className="text-center bg-green-500 text-white py-1 px-3 rounded-md mr-4">{owner?.accessibility}</p>
            </div>
          </div>
        ))}
      </div>
      <ShowAllAdmin members={members} refetch={refetch}></ShowAllAdmin>
      <ShowMember members={members} refetch={refetch}></ShowMember>

    </div>
  );
}

export default ShowAllMemberInfo;
