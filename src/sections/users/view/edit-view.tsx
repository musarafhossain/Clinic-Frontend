'use client';
import { Box, Typography } from '@mui/material';
import UserForm from '../user-from';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/services';

interface Props {
    id: string;
}

const EditView = ({ id }: Props) => {

    const userQuery = useQuery({
        enabled: !!id,
        queryKey: ['users', id],
        queryFn: () => UserService.getById(id),
        select: (response) => response?.data,
    })

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>
                Update User
            </Typography>

            {userQuery.data && <UserForm user={userQuery.data} />}
        </Box>
    );
};

export default EditView;
