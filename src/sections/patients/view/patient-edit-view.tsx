'use client';

import { Box } from '@mui/material';
import PatientForm from '../patient-from';
import { useQuery } from '@tanstack/react-query';
import { PatientService } from '@/services';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import UserFormSkeleton from '../user-form-skeleton';
import Retry from '@/sections/common/Retry';

interface Props {
    id: string;
}

const PatientEditView = ({ id }: Props) => {
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
        queryKey: ['patients', id],
        queryFn: () => PatientService.getById(id),
        select: (response) => response?.data,
        retry: false,
    });

    useEffect(() => {
        if (isError) {
            const msg =
                //@ts-ignore
                error?.response?.data?.message || 'Failed to fetch patient';
            toast.error(msg);
        }
    }, [isError, error]);

    if (isLoading) return <UserFormSkeleton />;

    if (isError) {
        return (
            <Retry
                message="Failed to load patient"
                onRetry={refetch}
                onBack={() => router.push(paths.patient.root)}
            />
        );
    }

    if (isFetched && !data) return null;

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, p: 2 }}>
            <PatientForm patient={data} />
        </Box>
    );
};

export default PatientEditView;
