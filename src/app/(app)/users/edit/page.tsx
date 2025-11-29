'use client';

import EditView from '@/sections/users/view/edit-view';
import { useEffect } from 'react';
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { setTitle } = useAppBarTitle();

  useEffect(() => {
    document.title = 'Edit User';
    setTitle('Edit User');
  }, [setTitle]);

  return <EditView id={id || ''} />;
};

export default page;
