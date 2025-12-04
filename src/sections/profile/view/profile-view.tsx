'use client';
import { Stack } from '@mui/material';
import UserInfo from '../../users/user-info';
import UserDetails from '../../users/user-details';
import { useAuth } from '@/hooks/useAuth';

const ProfileView = () => {
  const { user } = useAuth();

  return (
    <Stack gap={3} p={2.5}>
      <UserInfo name={user?.name || ''} id={user?.id || ''} />
      <UserDetails email={user?.email || '-'} phone={user?.phone || '-'} id={user?.id || ''} profile={true} />
    </Stack>
  );
};

export default ProfileView;
