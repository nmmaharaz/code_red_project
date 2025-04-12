import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import dbConnect, {collectionNameObj } from "@/lib/dbConnect"
import { NextResponse } from "next/server"




export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const blogBookmarksCollection = dbConnect(collectionNameObj.blogBookmarksCollection)
        const questionBookmarksCollection = dbConnect(collectionNameObj.questionBookmarksCollection)

        // Get user's blog bookmarks
        const blogBookmarks = await blogBookmarksCollection
            .find({ userEmail: session.user.email })
            .toArray()

        // Get user's question bookmarks
        const questionBookmarks = await questionBookmarksCollection
            .find({ userEmail: session.user.email })
            .toArray()

        return NextResponse.json({
            blogBookmarks: blogBookmarks.map(b => b.postId),
            questionBookmarks: questionBookmarks.map(b => b.postId)
        })
    } catch (error) {
        console.error("Error fetching bookmarks:", error)
        return NextResponse.json(
            { message: "Failed to fetch bookmarks" },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { postId, type } = await req.json()
        if (!postId || !type) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            )
        }

        const collection = type === "blog" 
            ? dbConnect(collectionNameObj.blogBookmarksCollection)
            : dbConnect(collectionNameObj.questionBookmarksCollection)

        // Check if bookmark exists
        const existingBookmark = await collection.findOne({
            userEmail: session.user.email,
            postId: postId
        })

        if (existingBookmark) {
            // Remove bookmark
            const result = await collection.deleteOne({
                userEmail: session.user.email,
                postId: postId
            })

            if (result.deletedCount === 0) {
                return NextResponse.json(
                    { message: "Failed to remove bookmark" },
                    { status: 500 }
                )
            }

            return NextResponse.json({
                message: "Bookmark removed successfully",
                isBookmarked: false
            })
        } else {
            // Add bookmark
            const result = await collection.insertOne({
                userEmail: session.user.email,
                postId: postId,
                createdAt: new Date()
            })

            if (!result.acknowledged) {
                return NextResponse.json(
                    { message: "Failed to add bookmark" },
                    { status: 500 }
                )
            }

            return NextResponse.json({
                message: "Bookmark added successfully",
                isBookmarked: true
            })
        }
    } catch (error) {
        console.error("Error updating bookmark:", error)
        return NextResponse.json(
            { message: "Failed to update bookmark" },
            { status: 500 }
        )
    }
} 