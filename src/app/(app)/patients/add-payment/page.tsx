'use client';
import { useEffect } from 'react';
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { useSearchParams } from 'next/navigation';
import { paths } from '@/routes/paths';
import AddPaymentView from '@/sections/patients/view/add-payment-view';

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { setTitleBar } = useAppBarTitle();

  useEffect(() => {
    setTitleBar('Add Payment', paths.patient.root);
  }, []);

  return AddPaymentView(id as string);
};

export default page;
