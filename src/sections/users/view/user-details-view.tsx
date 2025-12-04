'use client';

import { Box } from '@mui/material';
import UserInfo from '../user-info';
import UserDetails from '../user-details';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/services';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import UserFormSkeleton from '../user-form-skeleton';
import Retry from '@/sections/common/Retry';

interface Props {
    id: string;
}

const UserDetailsView = ({ id }: Props) => {
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
                onBack={() => router.push(paths.user.root)}
            />
        );
    }

    if (isFetched && !data) return null;

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <UserInfo name={data?.name || ''} id={data?.id || ''} />
            <UserDetails email={data?.email || '-'} phone={data?.phone || '-'} id={data?.id || ''} />
        </Box>
    );
};

export default UserDetailsView;
