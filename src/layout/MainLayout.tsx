'use client';

import React, { useEffect, useRef, useState } from 'react';
import MenuAppBar from '@/components/common/MenuAppBar';
import AppBottomNavigation from '@/components/common/AppBottomNavigation';
import { Box } from '@mui/material';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const appBarRef = useRef<HTMLDivElement>(null);
  const bottomNavRef = useRef<HTMLDivElement>(null);

  const [appBarHeight, setAppBarHeight] = useState(0);
  const [bottomNavHeight, setBottomNavHeight] = useState(0);

  useEffect(() => {
    if (!appBarRef.current || !bottomNavRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setAppBarHeight(appBarRef.current?.offsetHeight || 0);
      setBottomNavHeight(bottomNavRef.current?.offsetHeight || 0);
    });

    resizeObserver.observe(appBarRef.current);
    resizeObserver.observe(bottomNavRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box ref={appBarRef} sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200 }}>
        <MenuAppBar />
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          mt: `${appBarHeight}px`,
          mb: `${bottomNavHeight}px`,
        }}
      >
        {children}
      </Box>
      <Box
        ref={bottomNavRef}
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200 }}
      >
        <AppBottomNavigation />
      </Box>
    </Box>
  );
};

export default MainLayout;