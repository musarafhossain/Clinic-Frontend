import { useState } from 'react';
import { stringToColor } from '@/helpers/functions';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PatientService } from '@/services';
import dayjs from 'dayjs';
import ListItemText from '@mui/material/ListItemText';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface Props {
    row: any;
    patientId: string;
}

const PaymentHistoryListRow = ({ row, patientId }: Props) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => PatientService.deletePaymentHistory(row.id || ''),
        onSuccess: (resp) => {
            if (resp.success) {
                queryClient.invalidateQueries({ queryKey: ['payment-history', patientId] });
                setConfirmOpen(false);
                toast.success(resp.message);
            } else {
                toast.error(resp.message);
            }
        },
        onError: (error: any) => {
            console.error('Delete failed', error);
            toast.error('Failed to delete payment history');
        },
    });

    const openConfirmDialog = () => setConfirmOpen(true);
    const closeConfirmDialog = () => setConfirmOpen(false);

    return (
        <>
            <ListItem
                secondaryAction={
                    <IconButton onClick={openConfirmDialog} sx={{ color: 'error.main' }}>
                        <DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />
                    </IconButton>
                }
                divider
            >
                <ListItemAvatar>
                    <Avatar
                        sx={{
                            bgcolor: stringToColor(row?.created_at?.toString() || 'T'),
                            color: '#fff',
                        }}
                    >
                        <AttachMoneyIcon fontSize="medium" />
                    </Avatar>
                </ListItemAvatar>

                <ListItemText
                    primary={
                        <span style={{ color: 'green', fontWeight: 600, fontSize: '1.2rem' }}>
                            ₹{row.amount}
                        </span>
                    }
                    secondary={dayjs(row.created_at).format('YYYY-MM-DD hh:mm A')}
                />
            </ListItem>

            <Dialog open={confirmOpen} onClose={closeConfirmDialog}>
                <DialogTitle>Delete Payment History</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this transaction?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirmDialog}>Cancel</Button>
                    <Button
                        color="error"
                        onClick={() => deleteMutation.mutate()}
                        disabled={deleteMutation.isPending}
                        startIcon={
                            deleteMutation.isPending ? (
                                <CircularProgress size={16} color="inherit" />
                            ) : null
                        }
                    >
                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PaymentHistoryListRow;
