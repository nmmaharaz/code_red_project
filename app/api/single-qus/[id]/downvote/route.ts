import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export const GET = async ( { params }: { params: { id: string } }) => {
    const p = await params
    const questionCollection = dbConnect(collectionNameObj.questionCollection)
    const query = { _id: new ObjectId(p.id) }
    const singleQus = await questionCollection.findOne(query)
    return NextResponse.json(singleQus)
}

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const p = await params
    const questionCollection = dbConnect(collectionNameObj.questionCollection)
    const postId = new ObjectId(p.id)
    const body = await req.json()
    const userEmail = body.user;
    if (!userEmail) {
        return NextResponse.json({ message: "No user email provided" }, { status: 400 })
    }

    const post = await (await questionCollection).findOne({ _id: postId })
    if (!post) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }
    const alreadyDisliked = post.dislikes?.includes(userEmail);
    // const alreadyLiked = post.likes?.includes(userEmail);

    let updateDislikes = [...(post.dislikes || [])];
    let updateLikes = [...(post.likes || [])];

    if (alreadyDisliked) {
        updateDislikes = updateDislikes.filter((email) => email !== userEmail);
    } else {
        updateDislikes.push(userEmail);
        // Remove from likes if exists
        updateLikes = updateLikes.filter((email) => email !== userEmail);
    }
    const updateRes = await (await questionCollection).updateOne(
        { _id: postId },
        { $set: { dislikes: updateDislikes, likes: updateLikes } }
    );
    return NextResponse.json({
        message: alreadyDisliked ? "dislikes removed" : "dislikes added",
        totalLikes: updateDislikes.length,
        updateRes
    });
}