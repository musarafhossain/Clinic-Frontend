import React from 'react'
import { NotificationModel } from '@/models'
import { paths } from '@/routes/paths'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { NotificationService } from '@/services'
import { ListItem, ListItemButton, ListItemText, Typography, Stack, Divider } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
    row: NotificationModel;
    handleNotifClose?: () => void;
}

const NotificationListRow = (props: Props) => {
    const { row, handleNotifClose } = props;
    const router = useRouter();
    const due = (row.total_bill || 0) - (row.amount_paid || 0);
    const isDue = due > 0;
    const queryClient = useQueryClient();
    const markAsReadMutation = useMutation({
        mutationFn: (id: string) => NotificationService.markAsRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
    });
    return (
        <React.Fragment key={row.id}>
            <ListItem disablePadding divider>
                <ListItemButton
                    alignItems="flex-start"
                    sx={{
                        bgcolor: row.is_read === 0 ? 'action.hover' : 'inherit',
                    }}
                    onClick={() => {
                        handleNotifClose?.();
                        if (row.is_read === 0 && row.id) {
                            markAsReadMutation.mutate(row.id);
                        }
                        router.push(paths.patient.view(row.patient_id));
                    }}
                >
                    <ListItemText
                        slotProps={{ secondary: { component: 'div' } }}
                        primary={
                            <Typography variant="subtitle1" fontWeight="bold">
                                {row.patient_name}
                            </Typography>
                        }
                        secondary={
                            <Stack spacing={0.5} mt={0.5}>
                                <Typography variant="body2" color="text.secondary">
                                    {row.message}
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                    <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                                        Bill: ₹{row.total_bill}
                                    </Typography>
                                    <Divider orientation="vertical" flexItem />
                                    <Typography variant="body2" color="success" sx={{ fontWeight: 'bold' }}>
                                        Paid: ₹{row.amount_paid}
                                    </Typography>
                                    <Divider orientation="vertical" flexItem />
                                    <Typography variant="body2" color={isDue ? 'error' : 'info'} sx={{ fontWeight: 'bold' }}>
                                        {isDue ? `Due: ₹${due}` : `Advance: ₹${Math.abs(due)}`}
                                    </Typography>
                                </Stack>
                            </Stack>
                        }
                    />
                </ListItemButton>
            </ListItem>
        </React.Fragment>
    )
}

export default NotificationListRow;