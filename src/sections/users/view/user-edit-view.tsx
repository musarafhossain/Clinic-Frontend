'use client';

import { Box } from '@mui/material';
import UserForm from '../user-from';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/services';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import UserFormSkeleton from '../user-form-skeleton';
import Retry from '@/sections/common/Retry';

interface Props {
    id: string;
}

const UserEditView = ({ id }: Props) => {
    const router = useRouter();

    const {
        data,
        isLoading,
        isFetched,
        isError,
        error,
        refetch,
    } = useQuery({
        enabled: !!id,
        queryKey: ['users', id],
        queryFn: () => UserService.getById(id),
        select: (response) => response?.data,
        retry: false,
    });

    useEffect(() => {
        if (isError) {
            const msg =
                //@ts-ignore
                error?.response?.data?.message || 'Failed to fetch user';
            toast.error(msg);
        }
    }, [isError, error]);

    if (isLoading) return <UserFormSkeleton />;

    if (isError) {
        return (
            <Retry
                message="Failed to load user"
                onRetry={refetch}
                onBack={() => router.back()}
            />
        );
    }

    if (isFetched && !data) return null;

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, p: 2 }}>
            <UserForm user={data} />
        </Box>
    );
};

export default UserEditView;
