'use client';
import { Box } from '@mui/material';
import DiseaseForm from '../disease-from';
import { useQuery } from '@tanstack/react-query';
import { DiseaseService } from '@/services';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import DiseaseFormSkeleton from '../disease-form-skeleton';
import Retry from '@/sections/common/Retry';

interface Props {
    id: string;
}

const DiseaseEditView = ({ id }: Props) => {
    const router = useRouter();

    const diseaseQuery = useQuery({
        enabled: !!id,
        queryKey: ['diseases', id],
        queryFn: () => DiseaseService.getById(id),
        select: (response) => response?.data,
        retry: false,
    });

    const { data, isLoading, isError, error, refetch } = diseaseQuery;

    // Toast on error
    useEffect(() => {
        if (isError) {
            const msg =
                //@ts-ignore
                error?.response?.data?.message || 'Failed to fetch disease';
            toast.error(msg);
        }
    }, [isError, error]);

    if (isLoading) return <DiseaseFormSkeleton />;

    if (isError) {
        return (
            <Retry
                onRetry={refetch}
                onBack={() => router.push(paths.disease.root)}
                message="Failed to load disease"
            />
        );
    }

    if (!data) return null;

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, p: 2 }}>
            <DiseaseForm disease={data} />
        </Box>
    );
};

export default DiseaseEditView;
