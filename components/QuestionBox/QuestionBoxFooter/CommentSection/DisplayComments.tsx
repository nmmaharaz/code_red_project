import Image from "next/image";
import profileImage from '@/public/assets/profile-pic.png'

interface Comment {
    userName: string;
    userImage?: string;
    comment: string;
    createdAt: string | number | Date;
}

interface DisplayCommentsProps {
    allComments: Comment[];
}

export default function DisplayComments({ allComments }: DisplayCommentsProps) {
    console.log(allComments)
    return (
        <div>
            {allComments?.map((commentInfo, index) => (
                <div key={index} className="flex space-x-2 items-start border-b py-2">
                    <Image
                        src={commentInfo?.userImage || profileImage}
                        alt="Profile Image"
                        className="rounded-full"
                        width={40}
                        height={40}
                    />
                    <div>
                        <p className="font-semibold">{commentInfo?.userName}</p>
                        <p className="text-sm text-gray-700">{commentInfo?.comment}</p>
                        <p className="text-xs text-gray-400">
                            {new Date(commentInfo.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
