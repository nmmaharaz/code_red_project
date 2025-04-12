'use client'
import { Button } from "@/components/ui/button"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function SocialLoginReg() {
    const session = useSession()
    const route = useRouter()
    const handleSocialLogin = (providerName: string) => {
        // Logic to handle social login using provider
        console.log(`SOCIAL LOGIN: ${providerName}`);
        signIn(providerName)

    }


    useEffect(() => {
        if (session?.status == "authenticated") {
            toast.success("Login successfully");
            route.push("/")
        }
    }, [session?.status])


    return (
        <div className="flex justify-center items-center gap-4">
            <Button
                onClick={() => handleSocialLogin("google")}
                variant="secondary">Google</Button>
            <Button
                onClick={() => handleSocialLogin("github")}
                variant="secondary">Git Hub</Button>
        </div>
    )
}
