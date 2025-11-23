import AuthGuard from "@/components/AuthGuard";
import MainLayout from "@/layout/MainLayout";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <MainLayout>
                {children}
            </MainLayout>
        </AuthGuard>
    );
}
