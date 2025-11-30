'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    TextField,
    Button,
    Box,
} from '@mui/material';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { DiseaseService } from '@/services';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';
import { DiseaseModel } from '@/models';

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    amount: z
        .string()
        .min(1, "Amount is required")
        .refine((val) => !isNaN(Number(val)), { message: "Amount must be a number" }),
}).loose();

interface Props {
    disease?: DiseaseModel;
}

const DiseaseForm = ({ disease }: Props) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    type DiseaseFormValues = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DiseaseFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: disease?.name ?? '',
            amount: disease?.amount != null ? String(disease.amount) : '',
        },
    });

    const mutation = useMutation({
        mutationFn: (payload: DiseaseFormValues) => {
            const finalPayload = {
                ...payload,
                amount: Number(payload.amount),
            };

            if (disease?.id) {
                return DiseaseService.update(disease.id, finalPayload);
            }
            return DiseaseService.create(finalPayload);
        },
        onSuccess: (resp) => {
            if (resp.success) {
                toast.success(resp.message);
                queryClient.invalidateQueries({ queryKey: ['diseases'] });
                router.push(paths.disease.root);
            } else {
                toast.error(resp.message);
            }
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || 'Operation failed');
        },
    });

    const onSubmit = (data: DiseaseFormValues) => mutation.mutate(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
                label="Name *"
                fullWidth
                sx={{ mb: 2 }}
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
            />

            <TextField
                label="Amount *"
                fullWidth
                sx={{ mb: 2 }}
                {...register('amount')}
                error={!!errors.amount}
                helperText={errors.amount?.message}
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Button
                    type="button"
                    variant="outlined"
                    disabled={mutation.isPending}
                    size="large"
                    fullWidth
                    onClick={() => reset()}
                >
                    Reset
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    loading={mutation.isPending}
                    loadingPosition="end"
                    size="large"
                    fullWidth
                    disabled={mutation.isPending}
                >
                    Submit
                </Button>
            </Box>
        </form>
    );
};

export default DiseaseForm;
