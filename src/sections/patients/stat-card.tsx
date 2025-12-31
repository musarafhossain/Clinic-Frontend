"use client";
import { Paper, Typography, Stack } from "@mui/material";

interface StatCardProps {
    title: string;
    value: string | number;
    color: string;
}

export default function StatCard({ title, value, color }: StatCardProps) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: color
            }}
        >
            <Stack direction="row" spacing={2} alignItems="center">
                <Stack spacing={1}>
                    <Typography
                        variant="body2"
                        noWrap
                        sx={{
                            fontSize: "0.85rem",
                            fontWeight: 500,
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {value}
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
}
