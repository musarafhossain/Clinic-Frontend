"use client";

import { Grid } from "@mui/material";
import StatCard from "./stat-card";
import { PatientModel } from "@/models";

interface Props {
    patient: PatientModel;
}

export default function PatientStats({ patient }: Props) {
    const totalAttendance = patient.total_attendance || 0;
    const totalBill = Number(patient.total_bill) || 0;
    const amountPaid = Number(patient.amount_paid) || 0;

    // Calculate due or advance
    const diff = amountPaid - totalBill;

    const isAdvance = diff > 0;
    const finalLabel = isAdvance ? "Advance" : "Due Amount";
    const finalValue = Math.abs(diff);

    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                <StatCard title="Total Attendance" value={totalAttendance} />
            </Grid>
            <Grid size={6}>
                <StatCard title="Total Bill" value={`₹ ${totalBill}`} />
            </Grid>
            <Grid size={6}>
                <StatCard title="Amount Paid" value={`₹ ${amountPaid}`} />
            </Grid>
            <Grid size={6}>
                <StatCard title={finalLabel} value={`₹ ${finalValue}`} />
            </Grid>
        </Grid>
    );
}
