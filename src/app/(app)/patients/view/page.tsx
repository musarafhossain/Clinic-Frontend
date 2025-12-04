'use client';

import PatientDetailsView from '@/sections/patients/view/patient-details-view';
import { useEffect } from 'react';
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { useSearchParams } from 'next/navigation';
import { paths } from '@/routes/paths';

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { setTitleBar } = useAppBarTitle();

  useEffect(() => {
    setTitleBar('Patient View', paths.patient.root);
  }, []);

  return <PatientDetailsView id={id || ''} />;
};

export default page;