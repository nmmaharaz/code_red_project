
"use client"
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
export default function LoginInputs() {
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
        <div className="flex items-center justify-center ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="text-white md:p-6 rounded-lg shadow-lg w-96"
            >
                <h2 className="text-xl text-center font-bold mb-4">Log in Now</h2>


                <label className="block mb-2">Email:</label>
                <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                <div className="relative">


                    <label className="block mb-2">Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        {...register("password", { required: "Password is required" })}
                        className="w-full p-2 border rounded mb-2 pr-10"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2/3 transform -translate-y-1/2 cursor-pointer"
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
                    className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full "
                >
                    {/* w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 */}
                    Log In
                </button>
                <p className='text-[14px] text-center'>Dont&apos;t have an account? <Link href={'/register'} className='text-blue-500 underline underline-offset-4 font-semibold'>Register</Link> </p>
            </form>
        </div>
    )
}
