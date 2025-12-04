'use client';

import UserDetailsView from '@/sections/users/view/user-details-view';
import { useEffect } from 'react';
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { useSearchParams } from 'next/navigation';
import { paths } from '@/routes/paths';

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { setTitleBar } = useAppBarTitle();

  useEffect(() => {
    setTitleBar('User View', paths.user.root);
  }, []);

  return <UserDetailsView id={id || ''} />;
};

export default page;