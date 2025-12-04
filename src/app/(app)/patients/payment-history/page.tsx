'use client';
import { useEffect } from 'react';
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { useSearchParams } from 'next/navigation';
import { paths } from '@/routes/paths';
import PaymentHistoryListView from '@/sections/patients/view/payment-history-view';

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { setTitleBar } = useAppBarTitle();

  useEffect(() => {
    setTitleBar('Payment History', paths.patient.root);
  }, []);

  return PaymentHistoryListView(id as string);
};

export default page;
