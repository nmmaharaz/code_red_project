"use client"
import React from 'react'
import Image from 'next/image'
import profilePic from '@/public/assets/profile-pic.png'
import QuestionBoxFooter from '@/app/qus-ans/components/QuestionBox/QuestionBoxFooter/QuestionBoxFooter'
import { format } from 'date-fns'
import parse from 'html-react-parser'

interface BookmarkedQuestionsProps {
    questions: {
        _id: string
        image: string
        name: string
        postedAt: string
        content: string
        tags: string[]
        comments: { text: string; user: string }[]
        likes: string[]
        dislikes: string[]
    }[]
}

export default function BookmarkedQuestions({ questions }: BookmarkedQuestionsProps) {
    return (
        <div className="space-y-6">
            {questions.map(question => (
                <div key={question._id} className="bg-white rounded-lg shadow-md p-4">
                    {/* User Info */}
                    <div className="flex items-center space-x-3">
                        <Image
                            src={question.image || profilePic}
                            alt='Profile Photo'
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div>
                            <p className="font-semibold text-gray-800">{question.name}</p>
                            <p className="text-sm text-gray-500">
                                {format(new Date(question.postedAt), "dd-MMM''yy 'at' hh:mma")}
                            </p>
                        </div>
                    </div>

                    {/* Question Content */}
                    <div className="mt-3 text-gray-700">
                        <div className="text-gray-700 mt-2 text-sm">
                            {parse(question.content)}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap mt-3 space-x-2">
                        {question.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Reaction Buttons */}
                    <div className="flex justify-between mt-4 text-gray-500 text-sm">
                        <QuestionBoxFooter card={question} />
                    </div>
                </div>
            ))}
        </div>
    )
} 