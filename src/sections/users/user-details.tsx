"use client";
import { Typography, Stack, Paper, Divider, IconButton } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import { LockOpen } from "@mui/icons-material";
import { paths } from "@/routes/paths";
import { useRouter } from "next/navigation";
import InfoRow from "./info-row";

interface Props {
    id: string;
    email: string;
    phone: string;
    profile?: boolean;
}

export default function UserDetails({ id, email, phone, profile = false }: Props) {
    const router = useRouter();

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
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                    variant="body1"
                    sx={{ color: "text.primary", fontWeight: 600, fontSize: "1.15rem" }}
                >
                    Contact Information
                </Typography>
                {profile && <IconButton
                    size="small"
                    onClick={() => router.push(paths.profile_edit(id))}
                >
                    <EditIcon fontSize="small" color="action" />
                </IconButton>}
            </Stack>

            <Divider sx={{ mb: 2, mt: 1 }} />

            <Stack spacing={2}>
                <InfoRow
                    icon={<MailIcon color="action" />}
                    label="Email"
                    value={email || '-'}
                />
                <InfoRow
                    icon={<PhoneIcon color="action" />}
                    label="Phone"
                    value={phone || '-'}
                />
                <InfoRow
                    icon={<LockOpen color="action" />}
                    label="Password"
                    value='•••••••••••••••'
                />
            </Stack>
        </Paper>
    );
}
