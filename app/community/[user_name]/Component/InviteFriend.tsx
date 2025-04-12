"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


interface Friend {
  name: string;
  email?: string;
}

function InviteFriend() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [friendName, setFriendName] = useState<string[]>([]);
  // const [description, setDescription] = useState<string>("");
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [friendData, setFriendData] = useState<Friend[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  console.log(friendName)

  const { data } = useSession()
  const handleSelect = (name: string) => {
    if (selectedFriends.includes(name)) {
      const updated = selectedFriends.filter((n) => n !== name);
      setSelectedFriends(updated);
      setFriendName(updated);
    } else {
      const updated = [...selectedFriends, name];
      setSelectedFriends(updated);
      setFriendName(updated);
    }
  };

  const filteredFriends = friendData.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const response = await axios.get<Friend[]>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/friend/${data?.user?.email}`
        );
        setFriendData(response.data);
      } catch (error) {
        console.error("Error fetching friend data:", error);
      }
    };
    if (data?.user?.email) {
      fetchFriendData();
    }
  }, [data?.user?.email]);

  return (
    <dialog id="invite_friend" className="modal modal-middle">
      <form
        // onSubmit={handleCommunityCreate}
        className="fixed inset-0 flex justify-center items-center p-4"
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          <button
            type="button"
            onClick={() => document.getElementById("invite_friend")?.close()}
            className="text-gray-500 hover:text-gray-700 absolute top-3 right-3"
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold mb-4">Invite Friend</h2>
          <div className="space-y-4">


            <div className="relative">
              <label className="block text-gray-600">Invite friends</label>
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full cursor-pointer text-sm mt-2 p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              >
                {selectedFriends.length > 0
                  ? selectedFriends.join(", ")
                  : "Select friends"}
              </div>

              {showDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 border-b border-gray-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {filteredFriends.length > 0 ? (
                    filteredFriends.map((friend, index) => (
                      <div
                        key={index}
                        className={`p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${selectedFriends.includes(friend.name)
                            ? "bg-gray-200"
                            : ""
                          }`}
                        onClick={() => handleSelect(friend.name)}
                      >
                        <span>{friend.name}</span>
                        {selectedFriends.includes(friend.name) && (
                          <span className="text-green-500 font-bold">
                            &#10003;
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="p-2 text-gray-500">No friends found</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Invite
              </button>
            </div>
          </div>
        </div>
      </form>
    </dialog>
  )
}

export default InviteFriend