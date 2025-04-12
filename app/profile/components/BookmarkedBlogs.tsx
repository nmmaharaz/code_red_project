"use client"
import React from 'react'
import Image from 'next/image';
import profilePic from '@/public/assets/profile-pic.png'
import BlogBoxFooter from '@/components/HomeCenter/BlogBox/BlogBoxFooter/BlogBoxFooter';
import { format } from 'date-fns';
import parse from 'html-react-parser';

interface BookmarkedBlogsProps {
    blogs: {
        _id: string;
        image: string;
        name: string;
        postedAt: string;
        content: string;
        tags: string[];
        comments: { text: string; user: string }[];
        likes: string[];
        dislikes: string[];
    }[];
}

export default function BookmarkedBlogs({ blogs }: BookmarkedBlogsProps) {
    return (
        <div className="space-y-6">
            {blogs.map(blog => (
                <div key={blog._id} className="bg-white rounded-lg shadow-md p-4">
                    {/* User Info */}
                    <div className="flex items-center space-x-3">
                        <Image
                            src={blog.image || profilePic}
                            alt='Profile Photo'
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div>
                            <p className="font-semibold text-gray-800">{blog.name}</p>
                            <p className="text-sm text-gray-500">
                                {format(new Date(blog.postedAt), "dd-MMM''yy 'at' hh:mma")}
                            </p>
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="mt-3 text-gray-700">
                        <div className="text-gray-700 mt-2 text-sm">
                            {parse(blog.content)}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap mt-3 space-x-2">
                        {blog.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Reaction Buttons */}
                    <div className="flex justify-between mt-4 text-gray-500 text-sm">
                        <BlogBoxFooter card={blog} />
                    </div>
                </div>
            ))}
        </div>
    )
} 