// import { PATCH } from './route';
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const p = await params
    const blogCollection = dbConnect(collectionNameObj.blogCollection)
    const query = { _id: new ObjectId(p.id) }
    const singleBlog = await blogCollection.findOne(query)
    return NextResponse.json(singleBlog)
}


export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const p = await params
    const blogCollection = dbConnect(collectionNameObj.blogCollection)
    const postId = new ObjectId(p.id)
    const body = await req.json()
    const userEmail = body.user;
    if (!userEmail) {
        return NextResponse.json({ message: "No user email provided" }, { status: 400 })
    }

    const post = await (await blogCollection).findOne({ _id: postId })
    if (!post) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }
    const alreadyLiked = post.likes?.includes(userEmail)

    let updateLikes = [...(post.likes || [])];
    let updateDislikes = [...(post.dislikes || [])];


    if (alreadyLiked) {
        updateLikes = updateLikes.filter((email) => email !== userEmail);
    } else {
        updateLikes.push(userEmail);
        // Remove from dislikes if exists
        updateDislikes = updateDislikes.filter((email) => email !== userEmail);
    }
    const updateRes = await (await blogCollection).updateOne(
        { _id: postId },
        { $set: { likes: updateLikes, dislikes: updateDislikes } }
    );
    return NextResponse.json({
        message: alreadyLiked ? "Like removed" : "Like added",
        totalLikes: updateLikes.length,
        updateRes
    });
}


