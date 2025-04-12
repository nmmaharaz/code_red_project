"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "@/app/actions/auth/registerUser";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";


interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterInputsAnimation() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordValue = watch("password");


    const onSubmit = async (data: RegisterFormData) => {
        console.log(data);
        const { confirmPassword } = data;

        if (data.password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const regInputs = {
            name: data?.name,
            email: data?.email,
            password: data?.password
        }

        try {
            const res = await registerUser(regInputs);
            console.log("User Registered:", res);
            if (res && 'insertedId' in res && res.insertedId) {
                toast.success("User registered successfully", {
                    duration: 2000,
                    position: "top-right",
                });
                router.push('/login');
            } else if (res && 'status' in res && res.status === 400) {
                toast.error(res.message, {
                    duration: 2000,
                    position: "top-right",
                });
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error("Registration failed:", error);
        }
    };
    return (
        <Card className="relative overflow-hidden bg-black border-none text-white">
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                    {/* Enter your credentials to access your account. */}
                    Enter your credentials to make your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="text-white md:p-6 rounded-lg shadow-lg  space-y-2"
                >
                    <div className="space-y-2" >
                        <Label>Name</Label>
                        <Input
                            {...register("name", { required: "Name is required" })}
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2" >
                        <Label>Email</Label>
                        <Input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2" >
                        <Label>Password</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message:
                                            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character (e.g., Moin@122)",
                                    },
                                })}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="space-y-2" >
                        <Label>Confirm Password</Label>
                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: value =>
                                        value === passwordValue || "Passwords do not match",
                                })}
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    <Button type="submit" variant="outline" className="text-black w-full">Register</Button>
                    <p className="text-[14px] text-center">
                        Already have an account?{" "}
                        <Link
                            href={'/login'}
                            className="text-blue-500 underline underline-offset-4 font-semibold"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
            <BorderBeam duration={8} size={100} />
        </Card>
    )
}
