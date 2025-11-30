'use client';

import { Box } from '@mui/material';
import UserForm from '../user-from';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/services';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import UserFormSkeleton from '../user-form-skeleton';

interface Props {
    id: string;
}

const UserEditView = ({ id }: Props) => {
    const router = useRouter();

    const userQuery = useQuery({
        enabled: !!id,
        queryKey: ['users', id],
        queryFn: () => UserService.getById(id),
        select: (response) => response?.data,
        retry: false,
    });

    useEffect(() => {
        if (userQuery.isFetched && !userQuery.data) {
            router.push(paths.user.root);
        }
    }, [userQuery.isFetched, userQuery.data, router]);

    useEffect(() => {
        if (userQuery.isError) {
            const msg =
                //@ts-ignore
                userQuery.error?.response?.data?.message || 'Failed to fetch user';
            toast.error(msg);
        }
    }, [userQuery.isError, userQuery.error]);

    if (userQuery.isLoading) return <UserFormSkeleton />
    if (userQuery.isFetched && !userQuery.data) return null;

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, p: 2 }}>
            <UserForm user={userQuery.data} />
        </Box>
    );
};

export default UserEditView;
