// app/actions/auth/forgotPassword.ts
"use server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/email";

export const initiatePasswordReset = async (email: string) => {
  const userCollection = dbConnect(collectionNameObj.userCollection);
  const user = await userCollection.findOne({ email });

  if (!user) {
    return { error: "User not found" };
  }

  const resetToken = randomUUID();
  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

  await userCollection.updateOne(
    { email },
    {
      $set: {
        resetToken,
        resetTokenExpiry,
      },
    }
  );

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
  try {
    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
      `,
    });
    return { success: "Password reset email sent" };
  } catch {
    return { error: "Failed to send email" };
  }
};