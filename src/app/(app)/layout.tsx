'use client';
import AuthGuard from "@/components/AuthGuard";
import MainLayout from "@/layout/MainLayout";
import { AppBarTitleProvider } from "@/context/AppBarTitleContext";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <AppBarTitleProvider>
                <MainLayout>
                    {children}
                </MainLayout>
            </AppBarTitleProvider>
        </AuthGuard>
    );
}
