'use client'
import PatientCreateView from '@/sections/patients/view/patient-create-view';
import { useEffect } from 'react'
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { paths } from '@/routes/paths';

const page = () => {
    const { setTitleBar } = useAppBarTitle();

    useEffect(() => {
        setTitleBar('Add Patient', paths.patient.root);
    }, []);

    return <PatientCreateView />;
}

export default page;
