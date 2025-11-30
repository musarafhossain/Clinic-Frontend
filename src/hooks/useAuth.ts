"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
    loginSuccess as loginSuccessAction,
    logout as logoutAction,
    hydrateAuth,
} from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/paths";
import { AuthService } from "@/services";

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { user, token, hydrated, loading } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        if (!hydrated && typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            dispatch(
                hydrateAuth({
                    token: storedToken || null,
                    user: storedUser ? JSON.parse(storedUser) : null,
                })
            );
        }
    }, [hydrated, dispatch]);

    useEffect(() => {
        if (!token) return;

        const validateUser = async () => {
            try {
                const me = await AuthService.me();
                dispatch(
                    loginSuccessAction({
                        user: me?.data || me,
                        token,
                    })
                );
            } catch (err) {
                console.error("Auth validation failed:", err);
                logout();
            }
        };

        validateUser();
    }, [token, dispatch]);

    const loginSuccess = (payload: { user: any; token: string }) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("token", payload.token);
            localStorage.setItem("user", JSON.stringify(payload.user));
        }
        dispatch(loginSuccessAction(payload));
    };

    const logout = () => {
        dispatch(logoutAction());
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        router.push(paths.auth.signIn);
    };

    return {
        user,
        token,
        hydrated,
        loginSuccess,
        loading,
        logout,
    };
};
