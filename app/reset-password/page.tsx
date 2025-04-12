// app/reset-password/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/app/actions/auth/resetPassword";
import { useRouter } from "next/navigation";

interface ResetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm<ResetPasswordForm>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: ResetPasswordForm) => {
    console.log("Reset password attempt:", { email, token, newPassword: data.newPassword });
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const result = await resetPassword(email, token, data.newPassword);
    if (result.success) {
      toast.success(result.success);
      setIsSubmitted(true);
      setTimeout(() => router.push("/login"), 2000);
    } else {
      console.error("Reset password error:", result.error);
      toast.error(result.error || "An error occurred");
    }
  };

  if (!email || !token) {
    return <p className="text-red-500">Invalid reset link</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Reset Password</h2>
        {isSubmitted ? (
          <p className="text-white">Password reset successful! Redirecting to login...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">New Password</Label>
              <Input
                type="password"
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                placeholder="Enter new password"
                className="text-black"
              />
              {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-white">Confirm Password</Label>
              <Input
                type="password"
                {...register("confirmPassword", { required: "Please confirm your password" })}
                placeholder="Confirm new password"
                className="text-black"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>
            <Button type="submit" variant="outline" className="w-full text-black">
              Reset Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}