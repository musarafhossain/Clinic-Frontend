import { useState } from 'react';
import { PatientModel } from '@/models';
import { stringToColor } from '@/helpers/functions';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { PatientService } from '@/services';
import { paths } from '@/routes/paths';
import { PATIENT_STATUS, GENDER } from '@/helpers/enum';
import { Stack } from '@mui/material';
import dayjs from 'dayjs'
import PaymentsIcon from '@mui/icons-material/Payments';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Divider } from '@mui/material';


interface Props {
    row: PatientModel;
    status?: "" | PATIENT_STATUS;
}

const PatientListRow = ({ row, status }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();

    const deleteMutation = useMutation({
        mutationFn: () => PatientService.delete(row.id || ''),
        onSuccess: (resp) => {
            if (resp.success) {
                queryClient.invalidateQueries({ queryKey: ['patients', status] });
                setConfirmOpen(false);
                toast.success(resp.message);
            } else {
                toast.error(resp.message)
            }
        },
        onError: (error: any) => {
            console.error('Delete failed', error);
            toast.error('Failed to delete user');
        },
    });

    const openMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const closeMenu = () => setAnchorEl(null);
    const openConfirmDialog = () => {
        closeMenu();
        setConfirmOpen(true);
    };
    const closeConfirmDialog = () => setConfirmOpen(false);
    const open = Boolean(anchorEl);

    return (
        <>
            <ListItem
                secondaryAction={
                    <>
                        <IconButton onClick={openMenu}>
                            <MoreVertIcon />
                        </IconButton>
                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onClose={closeMenu}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <MenuList sx={{ width: 250, maxWidth: '100%' }}>
                                <MenuItem onClick={() => {
                                    closeMenu();
                                    router.push(paths.patient.view(row.id || ''));
                                }}>
                                    <ListItemIcon>
                                        <VisibilityIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>View</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    closeMenu();
                                    router.push(paths.patient.edit(row.id || ''));
                                }}>
                                    <ListItemIcon>
                                        <EditIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Edit</ListItemText>
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                    onClick={() => {
                                        closeMenu();
                                        router.push(paths.patient.add_payment(row.id || ''));
                                    }}
                                >
                                    <ListItemIcon>
                                        <PaymentsIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Add Payment</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        closeMenu();
                                        router.push(paths.patient.attendance_history(row.id || ''));
                                    }}
                                >
                                    <ListItemIcon>
                                        <EventNoteIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Attendance History</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        closeMenu();
                                        router.push(paths.patient.payment_history(row.id || ''));
                                    }}
                                >
                                    <ListItemIcon>
                                        <ReceiptLongIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Payment History</ListItemText>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={openConfirmDialog} sx={{ color: 'error.main' }}>
                                    <ListItemIcon>
                                        <DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                </MenuItem>
                            </MenuList>
                        </Popover>
                    </>
                }
                divider
            >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: stringToColor(row?.name || 'U'), color: '#fff' }}></Avatar>
                </ListItemAvatar>

                <Stack width='100%' spacing={0.5}>
                    <Stack flexDirection='row' gap={1.5} alignItems="center" justifyContent='space-between'>
                        <Typography variant='subtitle1'>{row?.name}</Typography>
                        <Stack flexDirection='row' alignItems='center' gap={0.5}>
                            {row.gender && <Avatar
                                sx={{
                                    width: 20,
                                    height: 20,
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: 'white',
                                    bgcolor: row?.gender === GENDER.MALE
                                        ? "info.main"
                                        : row?.gender === GENDER.FEMALE
                                            ? "success.main"
                                            : "warning.main"
                                }}
                            >
                                {row?.gender === GENDER.MALE
                                    ? "M"
                                    : row?.gender === GENDER.FEMALE
                                        ? "F"
                                        : "O"}
                            </Avatar>}
                        </Stack>
                    </Stack>
                    <Stack flexDirection='row' gap={1.5} alignItems="center" justifyContent='space-between'>
                        <Typography variant='caption'>
                            {row.guardian_name || "--"} • {row.dob ? dayjs(row.dob).format("DD/MM/YYYY") : "--"}
                        </Typography>
                    </Stack>
                </Stack>
            </ListItem>

            <Dialog open={confirmOpen} onClose={closeConfirmDialog}>
                <DialogTitle>Delete Patient</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete patient "{row.name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='inherit' onClick={closeConfirmDialog}>Cancel</Button>
                    <Button
                        color="error"
                        onClick={() => deleteMutation.mutate()}
                        disabled={deleteMutation.isPending}
                        startIcon={deleteMutation.isPending ? <CircularProgress size={16} color="inherit" /> : null}
                    >
                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PatientListRow;
