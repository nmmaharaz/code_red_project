'use client'


import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import profilePic from '@/public/assets/profile-pic.png'
import DialogContentPage from '../AllDrawerThings/DialogContentPage'

export default function PostInputSecDialog() {
    const { data: session } = useSession()
    return (
        <Dialog>
            <div className="border-2 border-gray-400 rounded-xl shadow-lg p-5 md:p-5 w-full">
                {/* <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger> */}
                {/* User Input Section */}
                <div className="flex items-center space-x-3">
                    <Image
                        src={session?.user?.image || profilePic}
                        width={40}
                        height={40}
                        alt="User Picture"
                        className="rounded-full border-2 border-blue-500"
                    />
                    <DialogTrigger asChild>
                        <input
                            type="text"
                            placeholder="What's on your mind?"
                            className="flex-1 bg-gray-100 text-gray-700 px-2 md:px-4 py-2 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </DialogTrigger>
                </div>
                {/* Action Buttons */}
                <div className="flex justify-between mt-4 max-w-sm mx-auto gap-1">
                    {/* Blog Trigger */}
                    <DialogTrigger asChild>
                        <Button className="cursor-pointer flex items-center bg-blue-600 hover:bg-blue-700 text-white md:px-5 py-2 rounded-lg font-medium transition duration-300">
                            ✍️ Add Blog
                        </Button>
                    </DialogTrigger>

                    {/* Question Trigger */}
                    <DialogTrigger asChild>
                        <Button className="cursor-pointer flex items-center bg-black border border-red-500 text-white md:px-5 py-2 rounded-lg font-medium transition duration-300">
                            ❓ Add Question
                        </Button>
                    </DialogTrigger>
                </div>
            </div>
            {/* DrawerContentPage Here */}
            <DialogContentPage />
        </Dialog>
    )
}
