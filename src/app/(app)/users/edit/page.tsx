'use client';

import UserEditView from '@/sections/users/view/user-edit-view';
import { useEffect } from 'react';
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { useSearchParams } from 'next/navigation';
import { paths } from '@/routes/paths';

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { setTitleBar } = useAppBarTitle();

  useEffect(() => {
    document.title = 'Edit User';
    setTitleBar('Edit User', paths.user.root);
  }, []);

  return <UserEditView id={id || ''} />;
};

export default page;