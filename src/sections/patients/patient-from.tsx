'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    TextField,
    Button,
    Box,
    FormControl,
    Autocomplete,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { PatientService, DiseaseService } from '@/services';
import { PatientModel, DiseaseModel } from '@/models';
import { GENDER, PATIENT_STATUS } from '@/helpers/enum';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';
import { Controller } from "react-hook-form";

export const patientSchema = z.object({
    name: z.string().min(1, "Name is required"),
    father_name: z.string().optional(),
    dob: z.string().optional(),
    gender: z.enum([GENDER.MALE, GENDER.FEMALE, GENDER.OTHERS]),
    phone: z.string().optional(),
    address: z.string().optional(),
    status: z.enum([
        PATIENT_STATUS.ONGOING,
        PATIENT_STATUS.COMPLETED,
        PATIENT_STATUS.CANCELLED
    ]),
    disease: z.object({
        id: z.union([z.string(), z.number()]).optional(),
        name: z.string().optional(),
        amount: z.union([z.string(), z.number()]).optional(),
    })
        .nullable()
        .optional(),
}).loose();

type FormValues = z.infer<typeof patientSchema>;

interface Props {
    patient?: PatientModel;
}

const PatientForm = ({ patient }: Props) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: diseaseList } = useQuery({
        queryKey: ['diseases'],
        queryFn: () => DiseaseService.getList(),
        select: (resp) => resp.data?.items || [],
    });

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            name: patient?.name ?? "",
            father_name: patient?.father_name ?? "",
            dob: patient?.dob
                ? new Date(patient.dob).toISOString().split("T")[0]
                : "",
            gender: patient?.gender ?? GENDER.MALE,
            phone: patient?.phone ?? "",
            address: patient?.address ?? "",
            disease: patient?.disease ?? null,
            status: patient?.status ?? PATIENT_STATUS.ONGOING,
        }
    });

    const mutation = useMutation({
        mutationFn: (payload: FormValues) => {
            const formattedPayload = {
                ...payload,
                dob: payload.dob
                    ? dayjs(payload.dob).format("YYYY-MM-DD")
                    : null,
            };

            return patient?.id
                ? PatientService.update(patient.id, formattedPayload)
                : PatientService.create(formattedPayload);
        },
        onSuccess: (resp) => {
            if (resp.success) {
                toast.success(resp.message);
                queryClient.invalidateQueries({ queryKey: ['patients'] });
                router.push(paths.patient.root);
            } else {
                toast.error(resp.message);
            }
        },
        onError: (err: any) =>
            toast.error(err?.response?.data?.message || 'Operation failed'),
    });

    const onSubmit = (data: FormValues) => {
        mutation.mutate(data);
    };

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
                label="Father Name *"
                fullWidth
                sx={{ mb: 2 }}
                {...register('father_name')}
            />
            <TextField
                label="Date of Birth"
                type="date"
                slotProps={{
                    inputLabel: { shrink: true },
                }}
                fullWidth
                sx={{ mb: 2 }}
                {...register("dob")}
                error={!!errors.dob}
                helperText={errors.dob?.message}
            />
            <FormControl sx={{ mb: 2 }}>
                <FormLabel>Gender *</FormLabel>
                <Controller
                    name="gender"
                    control={control}
                    defaultValue={patient?.gender ?? GENDER.MALE}
                    render={({ field }) => (
                        <RadioGroup row {...field}>
                            <FormControlLabel value={GENDER.MALE} control={<Radio />} label="Male" />
                            <FormControlLabel value={GENDER.FEMALE} control={<Radio />} label="Female" />
                            <FormControlLabel value={GENDER.OTHERS} control={<Radio />} label="Others" />
                        </RadioGroup>
                    )}
                />
            </FormControl>
            <TextField
                label="Phone"
                fullWidth
                sx={{ mb: 2 }}
                {...register('phone')}
            />
            <TextField
                label="Address"
                fullWidth
                multiline
                rows={3}
                sx={{ mb: 2 }}
                {...register('address')}
            />
            <Autocomplete
                options={diseaseList || []}
                getOptionLabel={(option: DiseaseModel) =>
                    option?.name ? `${option.name} - ₹${option.amount}` : ""
                }
                value={
                    diseaseList?.find((d) => Number(d.id) === Number(watch("disease")?.id))
                    || null
                }
                onChange={(event, newValue) => {
                    setValue("disease", newValue || null);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Disease"
                        sx={{ mb: 2 }}
                        error={!!errors.disease}
                        helperText={errors.disease?.message}
                    />
                )}
                isOptionEqualToValue={(option, value) => Number(option?.id) === Number(value?.id)}
            />
            <FormControl sx={{ mb: 2 }}>
                <FormLabel>Status *</FormLabel>
                <Controller
                    name="status"
                    control={control}
                    defaultValue={patient?.status ?? PATIENT_STATUS.ONGOING}
                    render={({ field }) => (
                        <RadioGroup row {...field}>
                            <FormControlLabel value={PATIENT_STATUS.ONGOING} control={<Radio />} label="Ongoing" />
                            <FormControlLabel value={PATIENT_STATUS.COMPLETED} control={<Radio />} label="Completed" />
                            <FormControlLabel value={PATIENT_STATUS.CANCELLED} control={<Radio />} label="Cancelled" />
                        </RadioGroup>
                    )}
                />
            </FormControl>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Button
                    type="button"
                    variant="outlined"
                    fullWidth
                    disabled={mutation.isPending}
                    onClick={() => reset()}
                >
                    Reset
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={mutation.isPending}
                >
                    Submit
                </Button>
            </Box>
        </form>
    );
};

export default PatientForm;
