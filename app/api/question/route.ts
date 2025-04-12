// import { authOptions } from "@/lib/authOptions"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
// import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

// Getting all question collection data
export const GET = async () => {
    // const session = await getServerSession(authOptions)
    // if (session) {
    // const email = session?.user?.email // Uncomment this line if you need the email for filtering
    const questionCollection = dbConnect(collectionNameObj.questionCollection)
    const result = await questionCollection.find({}).toArray()
    return NextResponse.json(result)
    // }

    // return NextResponse.json({})
}

// posting on questionCollection
export const POST = async (req: Request) => {

    const body = await req.json()
    const questionCollection = dbConnect(collectionNameObj.questionCollection)
    const result = await questionCollection.insertOne(body)
    return NextResponse.json(result)
}

