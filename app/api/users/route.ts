import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { NextResponse } from "next/server"


export const GET = async () => {
    const userCollection = await dbConnect(collectionNameObj.userCollection)
    const result = await userCollection.find({}).toArray()
    return NextResponse.json(result)
}