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
    Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginModel, LoginResponseModel, ResponseModel } from "@/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { paths } from "@/routes/paths";
import Logo from "@/assets/icon.png";
import { Config } from "@/Config";

const schema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(1, "Password is required"),
});

export default function SignInView() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { loginSuccess, user } = useAuth();

    useEffect(() => {
        if (user) router.push(paths.root);
    }, [user, router]);

    const mutation = useMutation({
        mutationFn: (params: LoginModel) => AuthService.login(params),
        onSuccess: (data: ResponseModel<LoginResponseModel>) => {
            loginSuccess({ user: data.data.user, token: data.data.token });
            toast.success('Login success!');
            router.push(paths.root);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Login failed");
        },
    });

    const { register, handleSubmit, formState: { errors } } = useForm<LoginModel>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: LoginModel) => {
        mutation.mutate(data);
    };

    return (
        <Box>
            <Paper
                elevation={0}
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
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <img src={Logo.src} alt="Logo" width={60} height={60} />
                </Box>

                <Typography variant="h5" align="center" fontWeight={700}>
                    Welcome to {Config.APP.NAME}
                </Typography>

                <Typography
                    align="center"
                    sx={{ color: "text.secondary", fontSize: 14, mt: -1 }}
                >
                    Sign in to your account
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}
                >
                    <TextField
                        label="Email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        placeholder="Enter your email"
                        fullWidth
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon fontSize="small" color="action" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        placeholder="Enter your password"
                        fullWidth
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon fontSize="small" color="action" />
                                    </InputAdornment>
                                ),
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
                            },
                        }}
                    />

                    <Box display='flex' justifyContent='end'>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={() => router.push(paths.auth.forgotPassword)}
                        >
                            Forgot password?
                        </Button>
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={mutation.isPending}
                        loading={mutation.isPending}
                        sx={{ height: 48, mt: 1 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
