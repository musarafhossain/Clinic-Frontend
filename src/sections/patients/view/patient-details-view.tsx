'use client';

import { Box } from '@mui/material';
import PatientInfo from '../patient-info';
import { useQuery } from '@tanstack/react-query';
import { PatientService } from '@/services';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import UserFormSkeleton from '../user-form-skeleton';
import Retry from '@/sections/common/Retry';
import PatientDetails from '../patient-details';
import { PatientModel } from '@/models';
import PatientStats from '../patient-stats';
import PatientActions from '../patient-actions';

interface Props {
    id: string;
}

const PatientDetailsView = ({ id }: Props) => {
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
                onBack={() => router.back()}
            />
        );
    }

    if (isFetched && !data) return null;

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <PatientInfo name={data?.name || ''} id={data?.id || ''} />
            <PatientStats patient={data as PatientModel} />
            <PatientActions patient={data as PatientModel} />
            <PatientDetails patient={data as PatientModel} />
        </Box>
    );
};

export default PatientDetailsView;
