"use client";

import { Grid } from "@mui/material";
import StatCard from "./stat-card";
import { PatientModel } from "@/models";
import { useTheme } from "@mui/material";

interface Props {
    patient: PatientModel;
}

export default function PatientStats({ patient }: Props) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const totalAttendance = patient.total_attendance || 0;
    const totalBill = Number(patient.total_bill) || 0;
    const amountPaid = Number(patient.amount_paid) || 0;

    const diff = amountPaid - totalBill;
    const isAdvance = diff > 0;
    const isBalanced = diff === 0;

    let finalLabel = "Due Amount";
    let finalColor = isDark ? "error.light" : "error.lighter";

    if (isBalanced) {
        finalLabel = "Balanced";
        finalColor = isDark ? "info.light" : "info.lighter";
    } else if (isAdvance) {
        finalLabel = "Advance";
        finalColor = isDark ? "success.light" : "success.lighter";
    }
    const finalValue = Math.abs(diff);

    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                <StatCard title="Total Attendance" value={totalAttendance} color={isDark ? "primary.light" : "primary.lighter"} />
            </Grid>
            <Grid size={6}>
                <StatCard title="Total Bill" value={`₹ ${totalBill}`} color={isDark ? "warning.light" : "warning.lighter"} />
            </Grid>
            <Grid size={6}>
                <StatCard title="Amount Paid" value={`₹ ${amountPaid}`} color={isDark ? "success.light" : "success.lighter"} />
            </Grid>
            <Grid size={6}>
                <StatCard title={finalLabel} value={`₹ ${finalValue}`} color={finalColor} />
            </Grid>
        </Grid>
    );
}
