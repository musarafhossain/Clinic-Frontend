'use client';
import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Paper,
    InputAdornment,
    Stack,
    OutlinedInput,
    TextField,
    IconButton
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services";
import Logo from "@/assets/icon.png";
import { paths } from "@/routes/paths";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
    email: z.string().min(1, "Email is required"),
    otp: z.string().min(6, "OTP must be 6 digits"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords don't match",
            path: ["confirmPassword"],
        });
    }
});

interface VerifyOtpParams {
    email: string;
    otp: string;
}

interface PasswordResetParams {
    email: string;
    otp: string;
    password?: string;
    confirmPassword?: string;
}

interface Props {
    email?: string;
}

export default function VerifyOtpView({ email }: Props) {
    const router = useRouter();
    const { loginSuccess } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    useEffect(() => {
        if (!email) {
            router.push(paths.auth.forgotPassword);
        }
    }, [email, router]);

    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const { register, handleSubmit, control, setError, formState: { errors } } = useForm<PasswordResetParams>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: email || '',
            otp: '',
            password: '',
            confirmPassword: '',
        }
    });

    const verifyOtpMutation = useMutation({
        mutationFn: (params: VerifyOtpParams) => AuthService.verifyOtp(params),
        onSuccess: (resp) => {
            toast.success(resp?.message || "OTP verified successfully");
            setIsOtpVerified(true);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to verify OTP");
        }
    });

    const mutation = useMutation({
        mutationFn: (params: PasswordResetParams) => AuthService.resetPassword(params),
        onSuccess: (resp) => {
            loginSuccess({ user: resp.data.user, token: resp.data.token });
            toast.success(resp?.message || "Password reset successfully");
            router.push(paths.root);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to reset password");
        }
    });

    const resendOtpMutation = useMutation({
        mutationFn: (params: { email: string }) => AuthService.sendOtp(params),
        onSuccess: (resp) => {
            toast.success(resp?.message || "OTP sent successfully");
            setTimer(30);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to send OTP");
        }
    });

    const onSubmit = (data: PasswordResetParams) => {
        if (!isOtpVerified) {
            const verifyParams: VerifyOtpParams = {
                email: data.email,
                otp: data.otp
            };
            verifyOtpMutation.mutate(verifyParams);
        } else {
            let hasError = false;
            if (!data.password) {
                setError("password", { type: "manual", message: "Password is required" });
                hasError = true;
            } else if (data.password.length < 6) {
                setError("password", { type: "manual", message: "Password must be at least 6 characters" });
                hasError = true;
            }

            if (!data.confirmPassword) {
                setError("confirmPassword", { type: "manual", message: "Confirm Password is required" });
                hasError = true;
            } else if (data.confirmPassword.length < 6) {
                setError("confirmPassword", { type: "manual", message: "Confirm Password must be at least 6 characters" });
                hasError = true;
            }

            if (hasError) return;

            if (data.password !== data.confirmPassword) {
                setError("confirmPassword", { type: "manual", message: "Passwords don't match" });
                return;
            }

            mutation.mutate(data);
        }
    };

    const handleResendOtp = () => {
        if (!email) {
            toast.error("Email is required");
            return;
        }
        resendOtpMutation.mutate({ email });
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
                    {isOtpVerified ? "Reset Password" : "Verify OTP"}
                </Typography>

                <Typography
                    align="center"
                    sx={{ color: "text.secondary", fontSize: 14, mt: -1 }}
                >
                    {isOtpVerified ? "Enter your new password" : "Enter your OTP to verify"}
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}
                >
                    {!isOtpVerified && (
                        <>
                            <Controller
                                name="otp"
                                control={control}
                                render={({ field }) => (
                                    <Stack direction="row" spacing={1} justifyContent="center">
                                        {[...Array(6)].map((_, index) => (
                                            <OutlinedInput
                                                key={index}
                                                value={field.value?.[index] || ""}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (!/^\d*$/.test(val)) return;
                                                    const currentOtp = field.value || "";
                                                    let newOtp = currentOtp.split("");
                                                    newOtp[index] = val.slice(-1);
                                                    const finalOtp = newOtp.join("");
                                                    field.onChange(finalOtp);

                                                    // Focus next input
                                                    if (val && index < 5) {
                                                        const nextInput = document.getElementById(`otp-${index + 1}`);
                                                        nextInput?.focus();
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Backspace" && !field.value?.[index] && index > 0) {
                                                        const prevInput = document.getElementById(`otp-${index - 1}`);
                                                        prevInput?.focus();
                                                        const currentOtp = field.value || "";
                                                        let newOtp = currentOtp.split("");
                                                        newOtp[index - 1] = ""; // Clear previous value on backspace
                                                        field.onChange(newOtp.join(""));
                                                    }
                                                }}
                                                onPaste={(e) => {
                                                    e.preventDefault();
                                                    const pasteData = e.clipboardData.getData("text").slice(0, 6);
                                                    if (/^\d+$/.test(pasteData)) {
                                                        field.onChange(pasteData);
                                                        pasteData.split("").forEach((char, i) => {
                                                            if (i < 6) {
                                                                // optional: could support filling specific inputs but onChange handles value
                                                            }
                                                        });
                                                        const nextIndex = Math.min(pasteData.length, 5);
                                                        document.getElementById(`otp-${nextIndex}`)?.focus();
                                                    }
                                                }}
                                                id={`otp-${index}`}
                                                inputProps={{
                                                    maxLength: 1,
                                                    style: { textAlign: "center" },
                                                }}
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: 1,
                                                    "& .MuiOutlinedInput-input": {
                                                        p: 0,
                                                        height: '100%',
                                                        textAlign: 'center'
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                )}
                            />
                            {errors.otp && (
                                <Typography color="error" variant="body2">
                                    {errors.otp.message}
                                </Typography>
                            )}

                            <Box display='flex' justifyContent='end'>
                                <Button
                                    variant="text"
                                    color="primary"
                                    disabled={resendOtpMutation.isPending || timer > 0}
                                    onClick={() => handleResendOtp()}
                                >
                                    {timer > 0 ? `Resend OTP (${timer}s)` : "Resend OTP"}
                                </Button>
                            </Box>
                        </>
                    )}

                    {isOtpVerified && (
                        <>
                            <TextField
                                label="New Password"
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                placeholder="Enter new password"
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
                                    }
                                }}
                            />

                            <TextField
                                label="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword")}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                                placeholder="Confirm new password"
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
                                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                        </>
                    )}

                    {/* Submit */}
                    <Stack direction="row" spacing={2} mt={2}>
                        <Button
                            variant="outlined"
                            sx={{ height: 48, flex: 1 }}
                            startIcon={<ArrowBackIcon />}
                            onClick={() => router.push(paths.auth.forgotPassword)}
                        >
                            Back
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={mutation.isPending || verifyOtpMutation.isPending}
                            loading={mutation.isPending || verifyOtpMutation.isPending}
                            sx={{ height: 48, flex: 1 }}
                        >
                            {isOtpVerified ? "Reset" : "Verify OTP"}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}
