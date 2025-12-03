import { Box, Skeleton } from '@mui/material';

const UserFormSkeleton = () => {
    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2 }}>
            <Skeleton variant="text" width={180} height={32} />
            <Box sx={{ mt: 3 }}>
                <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={40} width={120} />
            </Box>
        </Box>
    )
}

export default UserFormSkeleton