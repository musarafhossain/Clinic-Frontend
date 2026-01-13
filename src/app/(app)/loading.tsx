"use client";

import { Box, Skeleton, Stack } from "@mui/material";

export default function Loading() {
    return (
        <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
                {[...Array(6)].map((_, index) => (
                    <Skeleton key={index} variant="rounded" width="100%" height={70} />
                ))}
            </Stack>
        </Box>
    );
}
