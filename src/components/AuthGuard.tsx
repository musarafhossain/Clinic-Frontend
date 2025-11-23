"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { paths } from "@/routes/paths";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();

  const isAuthenticated = !!token; 

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(paths.auth.signIn);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <>Loading...</>;
  }

  return <>{children}</>;
}
