'use client'

import { useSession } from "next-auth/react"
import Image from "next/image"
// import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerTrigger,
} from "@/components/ui/drawer"
import DrawerContentPage from "../AllDrawerThings/DrawerContentPage"
import profilePic from "../../../public/assets/profile-pic.png"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"

export default function PostInputSec() {
    const { data: session } = useSession()

    return (
        <Drawer>
            <div className="border-2 border-gray-400 rounded-xl shadow-lg p-5 md:p-5 w-full">
                {/* User Input Section */}
                <div className="flex items-center space-x-3">
                    <Image
                        src={session?.user?.image || profilePic}
                        width={40}
                        height={40}
                        alt="User Picture"
                        className="rounded-full border-2 border-blue-500"
                    />
                    <DrawerTrigger asChild>
                        <input
                            type="text"
                            placeholder="What's on your mind?"
                            className="flex-1 bg-gray-100 text-gray-700 px-2 md:px-4 py-2 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </DrawerTrigger>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center mt-4 max-w-sm mx-auto gap-1">
                    {/* Blog Trigger */}
                    <DrawerTrigger asChild>
                        {/* <Button className="cursor-pointer flex items-center bg-blue-600 hover:bg-blue-700 text-white md:px-20 py-2 rounded-lg font-medium transition duration-300">
                            ✍️ Add Blog
                        </Button> */}
                        <InteractiveHoverButton className="hidden md:flex">✍️ Add Blog</InteractiveHoverButton>
                    </DrawerTrigger>

                    {/* Question Trigger */}
                    {/* <DrawerTrigger asChild>
                        <Button className="cursor-pointer flex items-center bg-black border border-red-500 text-white md:px-5 py-2 rounded-lg font-medium transition duration-300">
                            ❓ Add Question
                        </Button>
                    </DrawerTrigger> */}
                </div>
            </div>
            {/* DrawerContentPage Here */}
            <DrawerContentPage />
        </Drawer>
    )
}
