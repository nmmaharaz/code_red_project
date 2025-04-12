
import React from 'react'
import SocialLoginReg from '../components/SocialLoginReg'
import backgroundImage from '@/public/assets/login-registerBG.jpg'
import LoginAnimation from '@/app/(LogInAndRegister)/login/components/animation'
import LoginInputsAnimation from './components/logInInputsAnimation'

export default function RegisterPage() {
    return (
        <div
            className="relative min-h-screen flex items-center justify-center px-4 sm:px-6"
            style={{
                backgroundImage: `url(${backgroundImage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 z-0" />

            {/* Content wrapper */}
            <div className="relative z-10 w-full max-w-6xl bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                {/* Left side animation */}
                <div className="hidden md:block">
                    <LoginAnimation />
                </div>

                {/* Right side: form */}
                <div className="w-full max-w-md mx-auto">
                    {/* <LoginInputs /> */}
                    <LoginInputsAnimation />
                    <div className="divider divider-accent">Social Logins</div>
                    <SocialLoginReg />
                </div>
            </div>
        </div>
    )
}

