'use client';
import DiseaseEditView from '@/sections/disease/view/disease-edit-view';
import { useEffect } from 'react';
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { useSearchParams } from 'next/navigation';
import { paths } from '@/routes/paths';

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { setTitleBar } = useAppBarTitle();

  useEffect(() => {
    document.title = 'Edit Disease';
    setTitleBar('Edit Disease', paths.disease.root);
  }, []);

  return <DiseaseEditView id={id || ''} />;
};

export default page;