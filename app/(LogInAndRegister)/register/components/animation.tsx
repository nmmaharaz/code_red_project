'use client'
import Lottie from "lottie-react";
import registerAnimation from '@/public/assets/Register-Animation.json'
export default function RegisterAnimation() {
    return (
        <div>
            <Lottie animationData={registerAnimation}></Lottie>
        </div>
    )
}