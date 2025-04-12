// app/actions/auth/resetPassword.ts
"use server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const resetPassword = async (email: string, token: string, newPassword: string) => {
  try {
    console.log(`Starting resetPassword for email=${email}, token=${token}`);

    const userCollection = dbConnect(collectionNameObj.userCollection);
    
    // Log the current user state before the update
    const userBefore = await userCollection.findOne({ email });
    console.log("User before reset:", userBefore);

    // Find user with valid token and non-expired token
    const user = await userCollection.findOne({
      email,
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      console.error(`Reset password failed: No user found with email=${email}, token=${token}, or token expired`);
      return { error: "Invalid or expired token" };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user document
    const updateResult = await userCollection.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
          failedLoginAttempts: 0,
          loginAction: "unblock",
          lastFailedLogin: null,
          resetToken: null,
          resetTokenExpiry: null,
        },
      }
    );

    console.log("Update result:", updateResult);

    if (updateResult.modifiedCount === 0) {
      console.error(`Reset password failed: No document modified for email=${email}`);
      return { error: "Failed to update password" };
    }

    // Log the user state after the update
    const userAfter = await userCollection.findOne({ email });
    console.log("User after reset:", userAfter);

    console.log(`Password reset successful for email=${email}`);
    return { success: "Password reset successful" };
  } catch (error) {
    console.error(`Reset password error for email=${email}:`, error);
    return { error: "An error occurred while resetting the password" };
  }
};