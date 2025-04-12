
import QuestionBoxFooter from "../QuestionBoxFooter/QuestionBoxFooter";
import { format } from 'date-fns';
import { QuestionTableImagePart } from "./QuestionTableImagePart";
import Image from "next/image";
import profilePic from '@/public/assets/profile-pic.png'


interface QuestionTableProps {
    // comments: number;
    cardData: { _id: string; content: string; tags: string[]; name: string; postedAt: string; likes: string[]; dislikes: string[]; contentImage?: string[]; image?: string }[];
}

export default function QuestionTable({ cardData }: QuestionTableProps) {
    return (
        <div className="question_part p-4 ">
            {cardData?.map(item => (
                <div key={item._id} className="border border-gray-300 rounded-lg shadow-md p-4 mb-5 bg-white">
                    {/* User Info */}
                    <div className="flex items-center gap-2">
                        <div className="image">
                            <Image src={item?.image || profilePic} alt="Profile Pic" width={40} height={40} className="rounded-full" />
                        </div>
                        <div className="">
                            <div className="flex flex-col justify-center text-xs text-gray-500">
                                
                                <div className="text-black font-semibold text-lg">{item.name}</div>
                                <div>
                                    Posted at: {format(new Date(item?.postedAt), "dd-MMM''yy 'at' hh:mma")}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Image Carousel */}
                    {item.contentImage && item.contentImage.length > 0 && (
                        <QuestionTableImagePart images={item.contentImage} />
                    )}
                    {/* Display Rich Text Content */}
                    <div className="text-gray-700 mt-2 text-sm" dangerouslySetInnerHTML={{ __html: item.content }} />


                    {/* Footer: Upvote(like), Downvote(dislike), Comment, Bookmark & Report */}
                    <div className="flex items-center justify-between w-full my-4">
                        <QuestionBoxFooter
                            card={item} />
                    </div>
                </div>
            ))}
        </div>
    )
}
