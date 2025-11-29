'use client';
import { Box, Typography } from '@mui/material';
import UserForm from '../user-from';

const CreateView = () => {
    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>
                Create User
            </Typography>

            <UserForm />
        </Box>
    );
};

export default CreateView;
