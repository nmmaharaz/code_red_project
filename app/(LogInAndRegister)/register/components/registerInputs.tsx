"use client"
import { registerUser } from '@/app/actions/auth/registerUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}
export default function RegisterInputs() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const [showPassword, setShowPassword] = useState(false);



    const onSubmit = async (data: RegisterFormData) => {
        console.log(data);
        try {
            const res = await registerUser(data);
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
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="text-white md:p-6 rounded-lg shadow-lg w-96"
            >
                <h2 className="text-xl text-center font-bold mb-4">Register Now</h2>

                <label className="block mb-2">Name:</label>
                <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                <label className="block mb-2">Email:</label>
                <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <label className="block mb-2">Password:</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", { required: "Password is required" })}
                        className="w-full p-2 border rounded mb-2 pr-10"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/3 transform -translate-y-1/2 cursor-pointer"
                    >
                        {showPassword ? (
                            <FaEyeSlash className="text-gray-500" />
                        ) : (
                            <FaEye className="text-gray-500" />
                        )}
                    </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                <button
                    type="submit"
                    className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
                >
                    Register
                </button>
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
        </div>
    );
}
