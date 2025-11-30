'use client';
import { Box } from '@mui/material';
import UserForm from '../user-from';

const UserCreateView = () => {
    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, p: 2 }}>
            <UserForm />
        </Box>
    );
};

export default UserCreateView;
