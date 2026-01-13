'use client';

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { paths } from "@/routes/paths";
import SpalshScreen from "./SpalshScreen";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { token, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!token || !user)) {
      router.replace(paths.auth.signIn);
    }
  }, [loading, token, user, router]);

  if (loading) {
    return <SpalshScreen />;
  }

  if (!token || !user) {
    return null;
  }

  return <>{children}</>;
}
