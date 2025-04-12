
"use client"
import { BorderBeam } from '@/components/magicui/border-beam';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


interface LoginFormData {
    email: string;
    password: string;
}
export default function LoginInputsAnimation() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<LoginFormData>();

    const [showPassword, setShowPassword] = useState(false);



    const onSubmit = async (data: LoginFormData) => {
        console.log(data)
        try {
            const res = await signIn("credentials", { email: data.email, password: data.password, redirect: false })
            if (res && res.ok) {
                router.push('/')
                reset()
                toast.success('Login success')
            } else {
                toast.error('Authentication failed')
            }
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };
    return (
        <Card className="relative overflow-hidden bg-black border-none text-white">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Enter your credentials to access your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="text-white md:p-6 rounded-lg shadow-lg space-y-4"
                >
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Password</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: "Password is required" })}
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
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <Button type="submit" variant="outline" className="text-black w-full">
                        Login
                    </Button>

                    <p className="text-[14px] text-center">
                        Don&apos;t have an account?{" "}
                        <Link href={"/register"} className="text-blue-500 underline underline-offset-4 font-semibold">
                            Register
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
