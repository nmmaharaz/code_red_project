
// import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
// import { ObjectId } from "mongodb"
// import { NextResponse } from "next/server"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/authOptions"
// // import { authOptions } from "@/lib/auth" // Make sure this path is correct

// export const GET = async (req: Request, { params }: { params: { id: string } }) => {
//     const p = await params
//     const blogCollection = dbConnect(collectionNameObj.blogCollection)
//     const query = { _id: new ObjectId(p.id) }
//     const singleBlog = await (await blogCollection).findOne(query)
//     return NextResponse.json(singleBlog)
// }

// export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
//     const session = await getServerSession(authOptions)
//     const email = session?.user?.email
//     if (!session || !session.user || !email) {
//         return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
//     }

//     const p = await params
//     const blogCollection = dbConnect(collectionNameObj.blogCollection)
//     const postId = new ObjectId(p.id)
//     const body = await req.json()
//     const { comment } = body

//     if (!comment) {
//         return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
//     }

//     const post = await (await blogCollection).findOne({ _id: postId })
//     if (!post) {
//         return NextResponse.json({ message: "Post not found" }, { status: 404 })
//     }

//     const newComment = {
//         // userName,
//         // userEmail,
//         // userImage,
//         comment,
//         updateAt: new Date(),
//     }

//     const updateComments = [...(post.comments || []), newComment]
//     const updateRes = await (await blogCollection).updateOne(
//         { _id: postId },
//         { $set: { comments: updateComments } }
//     )

//     return NextResponse.json({
//         message: "Comment updated",
//         updateRes,
//     })
// }
