'use client';
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { loginSuccess as loginSuccessAction, logout as logoutAction } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/paths";

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { user, token } = useSelector((state: RootState) => state.auth);

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
        loginSuccess,
        logout,
    };
};
