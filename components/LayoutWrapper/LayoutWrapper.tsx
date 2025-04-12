'use client'

import { usePathname } from "next/navigation"
import Navbar from "../Navbar"
import { ReactNode } from "react"

export default function LayoutWrapper({ children }: { children: ReactNode }) {

    const pathname = usePathname()
    const hideNavbar = pathname === '/login' || pathname === '/register'
    return (
        <>
            {!hideNavbar && <Navbar />}
            <div className="bg-slate-950 text-white bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
                {children}
            </div>
        </>
    )
}
