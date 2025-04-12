'use client'
import Lottie from "lottie-react";
import loadingLottie from '@/public/assets/Loading-Animation.json'
export default function Loading() {
    return (
        <div>
            <Lottie animationData={loadingLottie}></Lottie>
        </div>
    )
}
