'use client';
import { useState, useEffect } from 'react';
import { useColorScheme } from '@mui/material/styles';
import { paths } from '@/routes/paths';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
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
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        router.push(newValue);
      }}
      showLabels
      sx={{
        bgcolor: bgColor,
        boxShadow: '0px -2px 6px rgba(0,0,0,0.1)',
        '& .MuiBottomNavigationAction-root': {
          color: textColor,
        },
        '& .Mui-selected': {
          color: 'primary.main',
        },
      }}
    >
      <BottomNavigationAction label="Home" value={paths.root} icon={<HomeIcon />} />
      <BottomNavigationAction label="Attendance" value={paths.attendance} icon={<CalendarMonthIcon />} />
      <BottomNavigationAction label="Patient" value={paths.patient.root} icon={<PeopleIcon />} />
      <BottomNavigationAction label="Profile" value={paths.profile} icon={<PersonIcon />} />
    </BottomNavigation>
  );
}
