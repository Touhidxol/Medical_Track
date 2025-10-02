"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";  // ✅ added

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [status, session]);


    return (
        <>
            {loggedIn ? (
                <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
                    <p className="text-2xl font-bold text-white">Already Signed In as</p>
                    <div className={`flex gap-2 items-center`}>
                        <div className="flex justify-center items-center bg-blue-600 rounded-full h-10 w-10">
                            <p className="font-bold">
                                {session?.user?.name ? session?.user?.name[0] : "A"}
                            </p>
                        </div>
                        <div className={`flex flex-col flex-1`}>
                            <p className="truncate max-w-[200px] text-white">{session?.user?.name}</p>
                            <p className="text-sm text-gray-500 truncate max-w-[200px]">{session?.user?.email}</p>
                        </div>
                    </div>
                    <div className={`flex flex-col gap-4 items-center w-[225px]`}>
                        <Button
                            onClick={() => { router.push("/dashboard"); }}
                            className="p-6 bg-white/95 w-full flex items-center gap-4 rounded-full hover:bg-white text-black transition cursor-pointer"
                        >
                            <img
                                src="/cornerArrow.svg"
                                alt="chat"
                                className="w-[20px] object-contain"
                            />
                            <p className="text-base">MediChat</p>
                        </Button>
                        <Button
                            onClick={() => signOut()}
                            className="p-6 w-full flex items-center gap-4 rounded-full transition cursor-pointer border border-white/20 bg-transparent hover:bg-white/5"
                        >
                            <img
                                src="/logout.svg"
                                alt="logout"
                                className="w-[16px] object-contain"
                            />
                            <p className="text-base">Logout</p>
                        </Button>
                    </div>
                </div>
            ) : (
                <div>
                    {children}
                </div>
            )}
        </>
    );
}
