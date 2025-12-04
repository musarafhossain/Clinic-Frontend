'use client';

import { useEffect } from 'react';
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { paths } from '@/routes/paths';
import { Box } from '@mui/material';
import UserForm from '@/sections/users/user-from';
import { useAuth } from '@/hooks/useAuth';
import { UserModel } from '@/models';

const page = () => {
  const { setTitleBar } = useAppBarTitle();
  const { user } = useAuth();

  useEffect(() => {
    setTitleBar('Profile Edit', paths.profile);
  }, []);

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, p: 2 }}>
      <UserForm user={user as UserModel} profile={true} />
    </Box>
  );
};

export default page;