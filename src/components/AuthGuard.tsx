'use client';

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { paths } from "@/routes/paths";
import SpalshScreen from "./SpalshScreen";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.replace(paths.auth.signIn);
    }
  }, [loading, token, router]);

  if (loading) {
    return <SpalshScreen />;
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
