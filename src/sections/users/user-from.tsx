'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    TextField,
    Button,
    InputAdornment,
    IconButton,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UserService } from '@/services';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';
import { UserModel } from '@/models';

// ---------------- Zod Schema ----------------
const userSchema = z.object({
    name: z.string().optional(),
    email: z.email(),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
    phone: z.string().optional(),
}).loose();

export type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
    user?: UserModel;
}

const UserForm = ({ user }: UserFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: user?.name ?? '',
            email: user?.email ?? '',
            password: '',
            phone: user?.phone ?? '',
        },
    });

    // ---------------- Mutation for Create + Update ----------------
    const mutation = useMutation({
        mutationFn: (payload: UserFormValues) => {
            if (user?.id) {
                return UserService.update(user.id, payload);
            }
            return UserService.create(payload);
        },
        onSuccess: (resp) => {
            if (resp.success) {
                toast.success(resp.message);
                queryClient.invalidateQueries({ queryKey: ['users'] });
                router.push(paths.user.root);
            } else {
                toast.error(resp.message)
            }
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || 'Operation failed');
        },
    });

    const onSubmit = (data: UserFormValues) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
                label="Name"
                fullWidth
                sx={{ mb: 2 }}
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
            />

            <TextField
                label="Email *"
                fullWidth
                sx={{ mb: 2 }}
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
            />

            <TextField
                label={user ? "New Password (optional)" : "Password *"}
                fullWidth
                sx={{ mb: 2 }}
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <TextField
                label="Phone"
                fullWidth
                sx={{ mb: 2 }}
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
            />

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={mutation.isPending}
            >
                {mutation.isPending
                    ? user
                        ? 'Updating...'
                        : 'Creating...'
                    : user
                        ? 'Update User'
                        : 'Create User'}
            </Button>
        </form>
    );
};

export default UserForm;
