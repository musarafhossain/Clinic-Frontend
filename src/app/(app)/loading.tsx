"use client";
import { Box, Skeleton, Stack } from "@mui/material";

export default function Loading() {
    return (
        <Box sx={{ p: 3 }}>
            <Skeleton variant="text" width={180} height={40} />
            <Skeleton variant="text" width={260} height={28} sx={{ mt: 1 }} />
            <Stack spacing={3} sx={{ mt: 4 }}>
                {[1, 2].map((i) => (
                    <Box
                        key={i}
                        sx={{
                            borderRadius: 2,
                        }}
                    >
                        <Skeleton variant="text" width="40%" height={30} />
                        <Skeleton variant="text" width="60%" height={22} />
                        <Skeleton variant="rounded" height={80} sx={{ mt: 1 }} />
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}
