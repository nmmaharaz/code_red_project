import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { email: string } }
) {
  const { email } = await params;
  const {
    group_name,
    user_name,
    group_picture,
    audience,
    members,
    description,
  } = await req.json();
  const userInfo = await dbConnect(collectionNameObj.userCollection)
  const userData = await userInfo.findOne({email})
  console.log(userData, "data returned");
  if (!userData)
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  {

    const groupMemberCollection = await dbConnect(
      collectionNameObj.groupMemberCollection
    );
    await groupMemberCollection.insertOne({user_name, member: userData.name, accessibility: "Owner"})
    members.map(async (member) => {
      await groupMemberCollection.insertOne({
        user_name,
        member,
        accessibility: "Invited",
      });
    });
  }
  const communityCollection = await dbConnect(
    collectionNameObj.communityCollection
  );
  const result = await communityCollection.insertOne({
    group_name,
    group_picture,
    audience,
    description,
    email,
    user_name,
    post:"Public"
  });
  return NextResponse.json(
    { message: "Community created successfully", result },
    { status: 201 }
  );
}

export async function GET(req:Request,{ params }: { params: { email: string } } ){
  const {email} =await params                    // from dynamic route
  const path = req.headers.get("path") || req.nextUrl.searchParams.get("path")
  const userCollection = await dbConnect(collectionNameObj.userCollection)
  const userInfo = await userCollection.findOne({email})
  const groupMemberCollection = await dbConnect(collectionNameObj.groupMemberCollection)
  const result = await groupMemberCollection.findOne({member:userInfo?.name, user_name:path})
  return NextResponse.json(result)
  }
