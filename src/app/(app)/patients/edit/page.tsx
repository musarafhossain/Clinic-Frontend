'use client';

import PatientEditView from '@/sections/patients/view/patient-edit-view';
import { useEffect } from 'react';
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { useSearchParams } from 'next/navigation';
import { paths } from '@/routes/paths';

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { setTitleBar } = useAppBarTitle();

  useEffect(() => {
    document.title = 'Edit Patient';
    setTitleBar('Edit Patient', paths.patient.root);
  }, []);

  return <PatientEditView id={id || ''} />;
};

export default page;