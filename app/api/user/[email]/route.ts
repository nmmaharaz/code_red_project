import dbConnect, { collectionNameObj } from "@/lib/dbConnect";import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { user_photo } = await req.json();
  const url = new URL(req.url);
  const email = url.pathname.split("/")[3];
  const updateRule = {
    $set: user_photo,
  };
  const userCollection = await dbConnect(collectionNameObj.userCollection);
  await userCollection.updateOne({ email }, updateRule);
  return NextResponse.json({ success: true }, { status: 200 });
}

export async function GET( { params }) {
  const {email} = await params;
  const userCollection = await dbConnect(collectionNameObj.userCollection);
  const result =  await userCollection.findOne({email})
  return NextResponse.json(result);
}
