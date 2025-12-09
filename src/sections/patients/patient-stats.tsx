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
    const finalLabel = isAdvance ? "Advance" : "Due Amount";
    const finalColor = isAdvance ? isDark ? "#009b0aff" : "#e5f9e6" : isDark ? "#8f0000ff" : "#f9e5e5";
    const finalValue = Math.abs(diff);

    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                <StatCard title="Total Attendance" value={totalAttendance} color={isDark ? "#0055a0ff" : "#e5f3f9"} />
            </Grid>
            <Grid size={6}>
                <StatCard title="Total Bill" value={`₹ ${totalBill}`} color={isDark ? "#8b8600ff" : "#f9f7e5"} />
            </Grid>
            <Grid size={6}>
                <StatCard title="Amount Paid" value={`₹ ${amountPaid}`} color={isDark ? "#009b0aff" : "#e5f9e6"} />
            </Grid>
            <Grid size={6}>
                <StatCard title={finalLabel} value={`₹ ${finalValue}`} color={finalColor} />
            </Grid>
        </Grid>
    );
}
