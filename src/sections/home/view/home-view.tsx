'use client';
import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';

const HomeView = () => {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Mark the component as mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <Typography variant="h4">Welcome, {user?.email || 'User'}</Typography>
      <Button variant="contained" color="error" onClick={logout}>
        Logout
      </Button>
    </Box>
  );
};

export default HomeView;
