'use client'
import PatientListView from '@/sections/patients/view/patient-list-view';
import { useEffect } from 'react'
import { useAppBarTitle } from '@/context/AppBarTitleContext';

const page = () => {
    const { setTitleBar } = useAppBarTitle();
    useEffect(() => {
        setTitleBar('Patients');
    }, []);

    return (
        <PatientListView />
    )
}

export default page