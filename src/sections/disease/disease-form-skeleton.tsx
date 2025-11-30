import { Box, Skeleton, Stack } from '@mui/material';

const DiseaseFormSkeleton = () => {
    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, p: 2 }}>
            <Box>
                <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
            </Box>

            <Stack direction="row" spacing={2}>
                <Skeleton variant="rectangular" height={56} sx={{ flex: 1 }} />
                <Skeleton variant="rectangular" height={56} sx={{ flex: 1 }} />
            </Stack>
        </Box>
    );
};

export default DiseaseFormSkeleton;
