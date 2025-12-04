"use client";
import { Paper, Typography, Stack } from "@mui/material";

interface StatCardProps {
    title: string;
    value: string | number;
}

export default function StatCard({ title, value }: StatCardProps) {
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
            <Stack direction="row" spacing={2} alignItems="center">
                <Stack spacing={1}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            fontSize: "0.85rem",
                            fontWeight: 500,
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 700 }}
                    >
                        {value}
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
}
