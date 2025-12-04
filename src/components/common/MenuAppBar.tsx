'use client';
import { useState } from 'react';
import { useColorScheme } from '@mui/material/styles';
import { useAuth } from '@/hooks/useAuth';
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AppBarDrawer from './AppBarDrawer';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { Config } from '@/Config';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function MenuAppBar() {
  const { title, backTo } = useAppBarTitle();
  const router = useRouter();
  const { logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);

  const [openDrawer, setOpenDrawer] = useState(false);
  const { mode, setMode } = useColorScheme();
  const darkMode = mode === 'dark';

  const notifications = [
    {
      title: "New Patient Added",
      name: "Dr. John",
      message: "A new patient has been registered successfully.",
    },
    {
      title: "Payment Received",
      name: "Accounts",
      message: "₹500 payment has been collected.",
    },
    {
      title: "Attendance Updated",
      name: "Staff",
      message: "Patient attendance marked for today.",
    },
    {
      title: "Attendance Updated",
      name: "Staff",
      message: "Patient attendance marked for today.",
    },
    {
      title: "Attendance Updated",
      name: "Staff",
      message: "Patient attendance marked for today.",
    },
    {
      title: "Attendance Updated",
      name: "Staff",
      message: "Patient attendance marked for today.",
    },
  ];

  const unreadCount = notifications.length;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleNotifOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchor(event.currentTarget);
  };

  const handleNotifClose = () => setNotifAnchor(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          {backTo ? (
            <IconButton
              onClick={() => router.push(backTo || '/')}
              edge="start"
              color="inherit"
              size="large"
              sx={{ mr: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => setOpenDrawer(!openDrawer)}
              edge="start"
              color="inherit"
              size="large"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title || Config.APP.NAME}
          </Typography>

          {/* THEME TOGGLE */}
          <IconButton
            size="large"
            color="inherit"
            onClick={() => setMode(darkMode ? 'light' : 'dark')}
            sx={{ mr: 1 }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* 🔔 NOTIFICATION ICON WITH BADGE */}
          <IconButton
            color="inherit"
            onClick={handleNotifOpen}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* 🔔 Notification Popover */}
          <Popover
            open={Boolean(notifAnchor)}
            anchorEl={notifAnchor}
            onClose={handleNotifClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            slotProps={{
              paper: {
                sx: {
                  maxHeight: 400,
                  overflowY: "auto",
                  p: 1,
                  borderRadius: 2,
                },
              },
            }}
          >
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

              {notifications.length === 0 ? (
                <ListItem>
                  <ListItemText primary="No notifications" />
                </ListItem>
              ) : (
                notifications.map((n, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" divider>
                      <ListItemText
                        primary={n.title}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ color: 'text.primary', display: 'inline' }}
                            >
                              {n.name}
                            </Typography>
                            {" — " + n.message}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))
              )}

            </List>
          </Popover>

          {/* USER MENU */}
          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                router.push(paths.profile);
              }}
            >
              <PersonIcon fontSize="small" sx={{ mr: 2 }} />
              Profile
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleMenuClose();
                logout();
              }}
              sx={{ color: 'error.main' }}
            >
              <LogoutIcon fontSize="small" sx={{ mr: 2, color: 'error.main' }} />
              Logout
            </MenuItem>
          </Popover>
        </Toolbar>
      </AppBar>

      <AppBarDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </Box>
  );
}
