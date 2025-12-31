'use client';
import { Box } from '@mui/material';
import UserInfo from '../../users/user-info';
import UserDetails from '../../users/user-details';
import { useAuth } from '@/hooks/useAuth';
import { UserModel } from '@/models';

const ProfileView = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <UserInfo name={user?.name || ''} id={user?.id || ''} />
      <UserDetails
        user={user as UserModel}
        profile={true}
      />
    </Box>
  );
};

export default ProfileView;
