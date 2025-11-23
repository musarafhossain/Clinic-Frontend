'use client';
import { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    CircularProgress,
    Typography,
    Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/AuthService";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { paths } from "@/routes/paths";

// -------------------------
// Zod schema
// -------------------------
const schema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(1, "Password is required"),
});

interface LoginParams {
    email: string;
    password: string;
}

export default function SignInView() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { loginSuccess, user } = useAuth();

    useEffect(() => {
        if (user) router.push(paths.root);
    }, [user, router]);

    // Use mutation to call AuthService.login
    const mutation = useMutation({
        mutationFn: (params: LoginParams) => AuthService.login(params),
        onSuccess: (data: any) => {
            loginSuccess({ user: data.user, token: data.token });
            toast.success('Login success!')
            router.push(paths.root);
        },
        onError: (error: any) => {
            toast.error(error.response.data.message);
        },
    });

    const { register, handleSubmit, formState: { errors } } = useForm<LoginParams>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: LoginParams) => {
        fetch("https://backend.musaraf.org.in/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
            credentials: "include", // only if your backend uses cookies
        })
            .then(async (res) => {
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || "Login failed");
                }
                return res.json();
            })
            .then((result) => {
                console.log("Login success:", result);
                // handle login success (save token, redirect, etc.)
            })
            .catch((error) => {
                console.error("Login error:", error.message);
            });
    };

    return (
        <Box>
            <Paper
                elevation={4}
                sx={{
                    maxWidth: 380,
                    mx: "auto",
                    mt: 8,
                    p: 4,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}
            >
                <Typography variant="h5" align="center" fontWeight={600}>
                    Sign In
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        label="Email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                    />

                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={mutation.isPending}
                        sx={{ height: 48, mt: 1 }}
                    >
                        {mutation.isPending ? (
                            <CircularProgress size={24} sx={{ color: "white" }} />
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
