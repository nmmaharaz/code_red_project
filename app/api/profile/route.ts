import dbConnect, {collectionNameObj } from "@/lib/dbConnect"
import { NextResponse } from "next/server"

export const PATCH = async (req: Request) => {
    try {
        const body = await req.json()
        const { email, ...updateData } = body

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 })
        }

        // Validate image size if coverPicture is being updated
        if (updateData.coverPicture) {
            // Remove the data URL prefix to get the actual base64 string
            const base64String = updateData.coverPicture.split(',')[1]
            // Calculate size in bytes (1 base64 character = 6 bits)
            const sizeInBytes = (base64String.length * 3) / 4
            // Limit to 2MB
            if (sizeInBytes > 2 * 1024 * 1024) {
                return NextResponse.json(
                    { message: "Image size must be less than 2MB" },
                    { status: 400 }
                )
            }
        }

        const userCollection = dbConnect(collectionNameObj.userCollection)
        const result = await userCollection.updateOne(
            { email },
            { $set: updateData }
        )

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Profile updated successfully" })
    } catch (error) {
        console.error("Error updating profile:", error)
        return NextResponse.json(
            { message: "Failed to update profile" },
            { status: 500 }
        )
    }
} 