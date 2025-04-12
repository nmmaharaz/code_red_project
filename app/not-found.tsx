'use client'
import Lottie from 'lottie-react'
import Link from 'next/link'
import errorLotti from '@/public/assets/Error-Animation.json'

export default function NotFoundPage404() {
    return (
        <div className='max-w-[35vw] mx-auto'>
            <Lottie animationData={errorLotti}></Lottie>
            <div className='text-center'>
                <Link href={'/'} className='btn'>Go Back To <span className='font-semibold text-blue-400 text-lg underline underline-offset-4'>Home Page</span></Link>
            </div>
        </div>
    )
}
