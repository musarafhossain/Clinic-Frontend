'use client';
import { Box, Button, Typography } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';

const HomeView = () => {
  const { user, logout } = useAuth();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 2,
      }}
    >
      <Button variant="contained" color="error" onClick={logout}>
        Logout
      </Button>
    </Box>
  );
};

export default HomeView;
