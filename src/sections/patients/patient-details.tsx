"use client";

import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import InfoIcon from "@mui/icons-material/Info";
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import dayjs from "dayjs";
import { PatientModel } from "@/models";
import InfoRow from "../users/info-row";

interface Props {
    patient: PatientModel;
}

export default function PatientDetails({ patient }: Props) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "#f4f4f4ff",
            }}
        >
            <Typography
                variant="body1"
                sx={{ color: "text.primary", fontWeight: 600, fontSize: "1.15rem" }}
            >
                Personal Information
            </Typography>

            <Divider sx={{ mb: 2, mt: 1 }} />

            <Stack spacing={2}>
                <InfoRow
                    icon={<FamilyRestroomIcon color="action" />}
                    label="Father's Name"
                    value={patient.father_name}
                />
                <InfoRow
                    icon={<CalendarMonthIcon color="action" />}
                    label="Date of Birth"
                    value={patient.dob ? dayjs(patient.dob).format("YYYY-MM-DD") : "-"}
                />
                <InfoRow
                    icon={<MaleIcon color="action" />}
                    label="Gender"
                    value={patient.gender || "-"}
                />
                <InfoRow
                    icon={<InfoIcon color="action" />}
                    label="Status"
                    value={patient.status || "-"}
                />
                <InfoRow
                    icon={<LocalHospitalIcon color="action" />}
                    label="Selected Disease"
                    value={
                        patient.disease
                            ? `${patient.disease.name} - ₹${patient.disease.amount}`
                            : "-"
                    }
                />
                <InfoRow
                    icon={<PhoneIcon color="action" />}
                    label="Phone"
                    value={patient.phone}
                />
                <InfoRow
                    icon={<BusinessIcon color="action" />}
                    label="Address"
                    value={patient.address}
                    allowWrap
                />
                <InfoRow
                    icon={<EventAvailableIcon color="action" />}
                    label="Enrollment Date"
                    value={
                        patient.enrollment_date
                            ? dayjs(patient.enrollment_date).format("YYYY-MM-DD hh:mm A")
                            : "-"
                    }
                />
            </Stack>
        </Paper>
    );
}

interface RowProps {
    icon: React.ReactNode;
    label: string;
    value: string | number | null | undefined;
    allowWrap?: boolean;
}