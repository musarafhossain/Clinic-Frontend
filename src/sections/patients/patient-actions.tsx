"use client";

import { Typography, Stack, Paper, IconButton } from "@mui/material";
import { PatientModel } from "@/models";
import EditIcon from "@mui/icons-material/Edit";
import PaymentIcon from '@mui/icons-material/Payment';
import { CurrencyRupee, CalendarMonth } from "@mui/icons-material";
import { paths } from "@/routes/paths";
import { useRouter } from "next/navigation";

interface Props {
    patient: PatientModel;
}

export default function PatientActions({ patient }: Props) {
    const router = useRouter();
    return (
        <Paper
            elevation={0}
            sx={{
                px: 1,
                py: 2,
                borderRadius: 2,
                backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "#f2f2f2ff",
            }}
        >
            <Stack direction="row" justifyContent="space-around" alignItems="center">
                <Stack alignItems="center" gap={0.5}>
                    <IconButton color="primary" sx={{ bgcolor: 'background.paper', p: 1.5 }} onClick={() => router.push(paths.patient.edit(patient.id ?? ''))}>
                        <EditIcon />
                    </IconButton>
                    <Typography variant="caption" color="text.secondary">Edit</Typography>
                </Stack>

                <Stack alignItems="center" gap={0.5}>
                    <IconButton color="success" sx={{ bgcolor: 'background.paper', p: 1.5 }} onClick={() => router.push(paths.patient.add_payment(patient.id ?? ''))}>
                        <PaymentIcon />
                    </IconButton>
                    <Typography variant="caption" color="text.secondary">Add Payment</Typography>
                </Stack>

                <Stack alignItems="center" gap={0.5}>
                    <IconButton color="info" sx={{ bgcolor: 'background.paper', p: 1.5 }} onClick={() => router.push(paths.patient.payment_history(patient.id ?? ''))}>
                        <CurrencyRupee />
                    </IconButton>
                    <Typography variant="caption" color="text.secondary">History</Typography>
                </Stack>

                <Stack alignItems="center" gap={0.5}>
                    <IconButton color="warning" sx={{ bgcolor: 'background.paper', p: 1.5 }} onClick={() => router.push(paths.patient.attendance_history(patient.id ?? ''))}>
                        <CalendarMonth />
                    </IconButton>
                    <Typography variant="caption" color="text.secondary">Attendance</Typography>
                </Stack>
            </Stack>
        </Paper>
    );
}