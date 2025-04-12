"use server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Provide user data" }, { status: 400 });
    }
    const userCollection = await dbConnect(collectionNameObj.userCollection);
    const user = await userCollection.findOne({email:data.email});
    if (user) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }
    const existingUserName = await userCollection.findOne({user_name:data?.user_name});
    if (existingUserName)
      return {
        message: "Username already used, please provide a unique username",
      };
    const hashPassword = await bcrypt.hash(data.password, 10)
    data.password = hashPassword; 
    const confirmHashPassword = await bcrypt.hash(data.confirm_password, 10)
    data.confirm_password = confirmHashPassword; 
    await userCollection.insertOne({
      ...data,
      user_photo: "",
    });
    return NextResponse.json({ success: true, message: "User registered successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to insert data" });
  }
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const password = searchParams.get("password");

    const userCollection = await dbConnect(collectionNameObj.userCollection);
    const user = await userCollection.findOne({email});
    if (!user) {
      return NextResponse.json({ error: "Cra" }, { status: 409 });
    }
    const hashPassword = await bcrypt.compare(password, user.password)
    if(!hashPassword)return NextResponse.json({ ok: false, message: "Invaild Password" });
    return NextResponse.json(user);
}
