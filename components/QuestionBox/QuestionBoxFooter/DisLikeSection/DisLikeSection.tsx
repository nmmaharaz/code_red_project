"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PiArrowFatDownFill, PiArrowFatDownLight } from "react-icons/pi";


interface DisLikeSectionProps {
    card: { _id: string; dislikes: string[] };
}
export default function DisLikeSection({ card }: DisLikeSectionProps) {
    const session = useSession()
    const postId = card._id
    const [dislikeCount, setDislikeCount] = useState(card?.dislikes?.length || 0);
    const [hasDisliked, setHasDisliked] = useState(false);


    // fetching questionLike data
    const fetchQusData = async () => {
        try {
            const { data } = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/single-qus/${postId}`);
            setDislikeCount(data?.dislikes?.length || 0);
            setHasDisliked(data?.dislikes?.includes(session?.data?.user?.email));
        } catch (error) {
            console.error("Error fetching questionLike data:", error);
        }
    }
    // Like/Dislike Functionality
    const updateDislike = async () => {
        try {
            const userEmail = session?.data?.user?.email;
            if (!userEmail) return;

            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/single-qus/${postId}/downvote`, {
                user: userEmail,
            });

            console.log("Like updated:", response.data);
            // Refresh the dislikes count in UI 
            await fetchQusData()
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    useEffect(() => {
        setHasDisliked(card?.dislikes?.includes(session?.data?.user?.email || "") || false);
    }, [card, session]);
    return (
        <>
            <Button
                onClick={updateDislike}
                className={`flex items-center sm:space-x-1 border
                    ${hasDisliked ? "bg-red-500" : "bg-white hover:bg-white"}
                    ${hasDisliked ? "text-white" : "text-gray-900 hover:text-red-500"}`}
            >
                {hasDisliked ? <PiArrowFatDownFill className="text-white" /> : <PiArrowFatDownLight />}
                <span className="flex justify-center items-center"><span className="font-semibold hidden md:flex">Downvote</span><span>({dislikeCount})</span></span>
            </Button>
        </>
    )
}
