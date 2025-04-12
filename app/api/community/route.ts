import dbConnect, { collectionNameObj } from "@/lib/dbConnect";import { NextResponse } from "next/server";

export async function GET(){
    const communityCollection = await dbConnect(collectionNameObj.communityCollection)
    const result = await communityCollection.find({}).toArray()
    return NextResponse.json(result)
}