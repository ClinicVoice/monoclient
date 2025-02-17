"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useToaster } from "@/providers/ToasterProvider";
import Loading from "@/components/loading/Loading";

interface AuthGuardProps {
    children: React.ReactNode;
    reroute?: string;
}

const AuthGuard = ({ children, reroute = "/login" }: AuthGuardProps) => {
    const { isAuthed, isInitialized } = useAuth();
    const router = useRouter();
    const { setToaster } = useToaster();

    useEffect(() => {
        if (isInitialized && !isAuthed ) {
            setToaster("Not authorized to access this page. Redirecting...", "error");
            router.push(reroute || "/login");
        }
    }, [isAuthed, isInitialized, reroute, router, setToaster]);

    if (!isAuthed || !isInitialized) {
        return <Loading />;
    }

    return children
};

export default AuthGuard;
