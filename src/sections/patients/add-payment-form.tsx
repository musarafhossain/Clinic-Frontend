'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    TextField,
    Button,
    Box,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PaymentHistoryService } from '@/services';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';

const schema = z.object({
    amount: z
        .string()
        .min(1, "Amount is required")
        .refine((val) => !isNaN(Number(val)), { message: "Amount must be a number" }),
    note: z.string().optional(),
}).loose();

interface Props {
    patientId: string;
}

const AddPaymentForm = ({ patientId }: Props) => {
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
            amount: '',
            note: ''
        },
    });

    const mutation = useMutation({
        mutationFn: (payload: DiseaseFormValues) => {
            return PaymentHistoryService.create(patientId, payload);
        },
        onSuccess: (resp) => {
            if (resp.success) {
                toast.success(resp.message);
                router.push(paths.patient.root);
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
                label="Amount *"
                fullWidth
                sx={{ mb: 2 }}
                {...register('amount')}
                error={!!errors.amount}
                helperText={errors.amount?.message}
            />
            <TextField
                label="Note"
                fullWidth
                sx={{ mb: 2 }}
                {...register('note')}
                error={!!errors.note}
                helperText={errors.note?.message}
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

export default AddPaymentForm;
