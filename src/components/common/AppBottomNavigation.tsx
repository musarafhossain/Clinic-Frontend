'use client';
import { useState, useEffect } from 'react';
import { useColorScheme } from '@mui/material/styles';
import { paths } from '@/routes/paths';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { usePathname, useRouter } from 'next/navigation';

export default function AppBottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { mode } = useColorScheme();

  const bgColor = mode === "dark" ? '#1e1e1e' : '#ffffff';
  const textColor = mode === "dark" ? '#bbb' : '#000';

  const getSelectedValue = () => {
    if (pathname === paths.root) return paths.root;
    if (pathname.startsWith(paths.attendance)) return paths.attendance;
    if (pathname.startsWith(paths.patient.root)) return paths.patient.root;
    if (pathname.startsWith(paths.profile)) return paths.profile;
    return null;
  };

  const [value, setValue] = useState(getSelectedValue);

  useEffect(() => {
    setValue(getSelectedValue());
  }, [pathname]);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'static',
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
        onChange={(event, newValue) => {
          setValue(newValue);
          router.push(newValue);
        }}
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
        <BottomNavigationAction label="Home" value={paths.root} icon={<HomeIcon />} />
        <BottomNavigationAction label="Attendance" value={paths.attendance} icon={<AccessTimeIcon />} />
        <BottomNavigationAction label="Patient" value={paths.patient.root} icon={<PeopleIcon />} />
        <BottomNavigationAction label="Profile" value={paths.profile} icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  );
}
