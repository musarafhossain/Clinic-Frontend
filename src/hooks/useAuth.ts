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

    const loginSuccess = (payload: { user: any; token: string }) => {
        dispatch(loginSuccessAction(payload));
    };

    const logout = () => {
        dispatch(logoutAction());
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
