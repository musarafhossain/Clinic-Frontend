'use client';
import { useState } from 'react';
import { useColorScheme } from '@mui/material/styles';
import { useAuth } from '@/hooks/useAuth';
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { useRouter } from 'next/navigation';

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

export default function MenuAppBar() {
  const { title, backTo } = useAppBarTitle();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { mode, setMode } = useColorScheme();
  const darkMode = mode === 'dark';
  const { logout } = useAuth();
  const router = useRouter();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {title || 'Phyzo'}
          </Typography>

          <IconButton
            size="large"
            color="inherit"
            onClick={() => setMode(darkMode ? 'light' : 'dark')}
            sx={{ mr: 1 }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <IconButton
            size="large"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleClose}>
              <PersonIcon fontSize="small" sx={{ mr: 2 }} />
              Profile
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose();
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
