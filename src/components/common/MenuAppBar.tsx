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
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import CircularProgress from '@mui/material/CircularProgress';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import { Config } from '@/Config';
import * as React from 'react';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import { NotificationService } from '@/services';
import { NotificationModel } from '@/models';
import NotificationListRow from '@/sections/notifications/notification-list-row';

export default function MenuAppBar() {
  const { title, backTo } = useAppBarTitle();
  const router = useRouter();
  const { logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);

  const [openDrawer, setOpenDrawer] = useState(false);
  const { mode, setMode } = useColorScheme();
  const darkMode = mode === 'dark';

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => NotificationService.getList({ page: 1, limit: 10 }),
    select: (res) => ({
      items: res.data?.items || [],
      unreadCount: res.data?.unreadCount || 0
    }),
  });

  const notifications = data?.items || [];
  const unreadCount = data?.unreadCount || 0;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleNotifOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchor(event.currentTarget);
    refetch();
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
                  width: 360,
                  height: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  p: 1,
                  borderRadius: 2,
                },
              },
            }}
          >
            {isLoading ? (
              <Stack sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress size={32} sx={{ mb: 2 }} />
                <Typography variant="body1">Loading...</Typography>
              </Stack>
            ) : notifications.length === 0 ? (
              <Stack sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <NotificationsOffIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                <Typography variant="body1" color="text.secondary">No notifications</Typography>
              </Stack>
            ) : (
              <Stack sx={{ height: '100%' }}>
                <List sx={{ flexGrow: 1, overflowY: 'auto', bgcolor: 'background.paper', p: 0 }}>
                  {notifications.map((n: NotificationModel, index: number) =>
                    <NotificationListRow key={n.id || index} row={n} handleNotifClose={handleNotifClose} />
                  )}
                </List>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    fullWidth
                    variant="text"
                    size="small"
                    onClick={() => {
                      handleNotifClose();
                      router.push(paths.notification);
                    }}
                  >
                    Show All Notifications
                  </Button>
                </Box>
              </Stack>
            )}
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
