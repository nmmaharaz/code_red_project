'use client'
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"


import { MessageSquare } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import profilePic from '../../../../../public/assets/profile-pic.png'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import DisplayComments from './DisplayComments';
import { useState } from 'react';

interface FormData {
    comment: string;
}
interface CommentSectionProps {
    card: { _id: string; dislikes: string[] };
}
export default function CommentSection({ card }: CommentSectionProps) {
    const { data: session } = useSession()
    const { register, handleSubmit, reset } = useForm<FormData>();
    const [allComments, setAllComments] = useState([])
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const fetchQusData = async () => {
        // setLoading(true);
        try {
            const { data } = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/single-blog/${card?._id}`);
            // setAllComments(data?.comments || [])
            setAllComments(data?.comments || [])
            console.log(data)
        } catch (error) {
            console.error("Error fetching questionLike data:", error);
            // setError("Failed to load comments");
        } finally {
            // setLoading(false);
        }
    }
    const onSubmit = async (data: FormData) => {
        if (!session) {
            toast.error("You must be logged in to post a comment!");
            signIn(undefined, { callbackUrl: window.location.href })
            return;
        }
        const commentUserData = {
            userName: session?.user?.name,
            userEmail: session?.user?.email,
            userImage: session?.user?.image,
            comment: data.comment,
        };
        console.log("Comment data:", commentUserData);
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/single-blog/${card?._id}/comment`, commentUserData);
            console.log("Comment response:", response.data);
            toast.success("Comment added successfully!");
            // Optionally, you can refresh the comments or perform any other action here
            fetchQusData()
            reset();
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };
    return (
        <Dialog onOpenChange={(open) => open && fetchQusData()}>
            <DialogTrigger asChild>
                <Button className="bg-white hover:bg-white border text-gray-900 hover:text-gray-100">
                    <div className="flex items-center space-x-1 text-gray-900">
                        <MessageSquare className="w-5 h-5" />
                        <span>Comments</span><span>({allComments?.length})</span>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[88vw] overflow-hidden">
                <div className="overflow-y-auto max-h-[75vh] px-2">
                    <DialogHeader>
                        <DialogTitle>Comment section</DialogTitle>
                        <DialogDescription>
                            Read peoples thinking & Place your comment here.
                        </DialogDescription>
                    </DialogHeader>
                    <DisplayComments allComments={allComments} />
                    <div className="divider"></div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border border-gray-600 p-4 sticky bottom-0 bg-white z-50 rounded-lg">
                        <div className="flex items-center justify-between space-x-3 border-b-2 border-gray-300 pb-4">
                            <div className='flex items-center space-x-3'>
                                <div>
                                    <Image
                                        src={session?.user?.image || profilePic}
                                        alt='Profile Image'
                                        width={40}
                                        height={40}
                                        className='rounded-full' />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='text-gray-900 font-semibold text-sm'>{session?.user?.name}</p>
                                    <p className='text-gray-500 text-sm'>{session?.user?.email}</p>
                                </div>
                            </div>
                            <div>
                                <DialogFooter>
                                    <Button type="submit" className='bg-white text-black border hover:text-white'>Post </Button>
                                </DialogFooter>
                            </div>
                        </div>
                        <div className="">
                            <Textarea placeholder="Type your message here."
                                {...register("comment", { required: true })} />
                        </div>
                        {/* </div> */}

                    </form>

                </div>
            </DialogContent>
        </Dialog >
    )
}
