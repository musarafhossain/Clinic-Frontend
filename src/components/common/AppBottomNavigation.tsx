'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';

import { useColorScheme } from '@mui/material/styles';

export default function AppBottomNavigation() {
  const [value, setValue] = React.useState(0);

  // ⭐ Get MUI color mode
  const { mode } = useColorScheme();

  // auto bg based on system + user toggle
  const bgColor = mode === "dark" ? '#1e1e1e' : '#ffffff';
  const textColor = mode === "dark" ? '#bbb' : '#000';

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: bgColor,
        boxShadow: '0px -2px 6px rgba(0,0,0,0.1)',
        zIndex: 1000,
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        showLabels
        sx={{
          bgcolor: bgColor,
          '& .MuiBottomNavigationAction-root': {
            color: textColor,
          },
          '& .Mui-selected': {
            color: '#1976d2',
          },
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  );
}
