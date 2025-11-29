'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { paths } from '@/routes/paths';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import HealingIcon from '@mui/icons-material/Healing';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

export default function AppBarDrawer({ open, setOpen }: Props) {
    const router = useRouter();
    const { logout } = useAuth();

    const toggleDrawer = (value: boolean) => () => {
        setOpen(value);
    };

    const goTo = (path: string) => {
        setOpen(false); 
        router.push(path);
    };

    const DrawerList = (
        <Box
            sx={{ width: 250, height: "100%", display: "flex", flexDirection: "column" }}
            role="presentation"
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => goTo(paths.user.root)}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => goTo(paths.disease.root)}>
                        <ListItemIcon><HealingIcon /></ListItemIcon>
                        <ListItemText primary="Diseases" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => goTo(paths.about)}>
                        <ListItemIcon><InfoIcon /></ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider />

            <List>
                <ListItem disablePadding>
                    <Button
                        onClick={logout}
                        color='error'
                        variant='outlined'
                        sx={{ width: '100%', m: 2 }}
                        endIcon={<LogoutIcon />}
                    >
                        Logout
                    </Button>
                </ListItem>
            </List>

            <Box sx={{ mt: "auto", p: 2, textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary">
                    App Version 1.0.0
                </Typography>
            </Box>

        </Box>
    );

    return (
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    );
}
