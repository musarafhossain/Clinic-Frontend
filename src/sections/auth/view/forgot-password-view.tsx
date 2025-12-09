'use client';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
    InputAdornment,
    Stack,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services";
import Logo from "@/assets/icon.png";
import { paths } from "@/routes/paths";

const schema = z.object({
    email: z.email("Invalid email"),
});

interface ForgotParams {
    email: string;
}

export default function ForgotPasswordView() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<ForgotParams>({
        resolver: zodResolver(schema),
    });

    /* const mutation = useMutation({
        mutationFn: (params: ForgotParams) => AuthService.forgotPassword(params),
        onSuccess: () => {
            toast.success("Reset link sent to your email");
            router.push(paths.auth.signIn);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to send reset link");
        }
    }); */

    const onSubmit = (data: ForgotParams) => {
        //mutation.mutate(data)
        toast.error('Forgot password is not implemented');
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
                    Forgot Password
                </Typography>

                <Typography
                    align="center"
                    sx={{ color: "text.secondary", fontSize: 14, mt: -1 }}
                >
                    Enter your email to receive a reset link
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

                    {/* Submit */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        /* disabled={mutation.isPending} */
                        sx={{ height: 48, mt: 1 }}
                    >
                        {/* {mutation.isPending ? (
                            <CircularProgress size={24} sx={{ color: "white" }} />
                        ) : (
                            "Send OTP"
                        )} */}
                        Send OTP
                    </Button>
                    <Stack justifyContent='end'>
                        <Typography
                            align="center"
                            sx={{
                                mt: 1,
                                color: "primary.main",
                                cursor: "pointer",
                                fontWeight: 500,
                            }}
                            onClick={() => router.push(paths.auth.signIn)}
                        >
                            Back to Sign In
                        </Typography>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}
