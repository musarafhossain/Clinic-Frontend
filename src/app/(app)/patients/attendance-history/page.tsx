'use client';
import { useEffect } from 'react';
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { useSearchParams } from 'next/navigation';
import { paths } from '@/routes/paths';
import AttendanceHistoryListView from '@/sections/patients/view/attendance-history-view';

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { setTitleBar } = useAppBarTitle();

  useEffect(() => {
    setTitleBar('Attendance History', paths.patient.root);
  }, []);

  return AttendanceHistoryListView(id as string);
};

export default page;
