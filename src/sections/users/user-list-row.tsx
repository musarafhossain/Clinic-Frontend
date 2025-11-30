import { useState } from 'react';
import { UserModel } from '@/models';
import { stringToColor } from '@/helpers/functions';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
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
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { UserService } from '@/services';
import { paths } from '@/routes/paths';

interface Props {
    row: UserModel;
}

const UserListRow = ({ row }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();

    const deleteMutation = useMutation({
        mutationFn: () => UserService.delete(row.id || ''),
        onSuccess: (resp) => {
            if (resp.success) {
                queryClient.invalidateQueries({ queryKey: ['users'] });
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

    const handleView = () => {
        closeMenu();
        router.push(paths.user.view(row.id || ''));
    };
    const handleEdit = () => {
        closeMenu();
        router.push(paths.user.edit(row.id || ''));
    };

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
                            <MenuItem onClick={handleView}>
                                <VisibilityIcon fontSize="small" sx={{ mr: 2 }} />
                                View
                            </MenuItem>

                            <MenuItem onClick={handleEdit}>
                                <EditIcon fontSize="small" sx={{ mr: 2 }} />
                                Edit
                            </MenuItem>

                            <MenuItem
                                onClick={openConfirmDialog}
                                sx={{ color: 'error.main' }}
                            >
                                <DeleteIcon fontSize="small" sx={{ mr: 2, color: 'error.main' }} />
                                Delete
                            </MenuItem>
                        </Popover>
                    </>
                }
                divider
            >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: stringToColor(row?.name || 'U'), color: '#fff' }}></Avatar>
                </ListItemAvatar>

                <ListItemText primary={row.name || 'Not Available'} secondary={row.email} />
            </ListItem>

            <Dialog open={confirmOpen} onClose={closeConfirmDialog}>
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete user "{row.name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirmDialog}>Cancel</Button>
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

export default UserListRow;
