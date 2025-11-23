'use client';
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/paths";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    useEffect(() => {
        if (mounted && !user) router.push(paths.auth.signIn);
    }, [mounted, user, router]);
    if (!mounted) return null;
    if (!user) return <p>Redirecting...</p>;
    return <>{children}</>;
}
