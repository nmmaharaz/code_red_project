import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server"

export async function GET( {params}:{params:{email:string}}){
     const {email} =await params
     const userCollection = await dbConnect(collectionNameObj.userCollection)
     const result = await userCollection.findOne({email})
     return NextResponse.json(result)
}
