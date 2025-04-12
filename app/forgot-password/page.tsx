// app/forgot-password/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { initiatePasswordReset } from "@/app/actions/auth/forgotPassword";

interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: ForgotPasswordForm) => {
    const result = await initiatePasswordReset(data.email);
    if (result.success) {
      toast.success(result.success);
      setIsSubmitted(true);
    } else {
      toast.error(result.error || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Forgot Password</h2>
        {isSubmitted ? (
          <p className="text-white">Check your email for a password reset link.</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Email</Label>
              <Input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="text-white"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <Button type="submit" variant="outline" className="w-full text-black">
              Send Reset Link
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}