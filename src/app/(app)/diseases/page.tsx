'use client'
import DiseaseListView from '@/sections/disease/view/disease-list-view';
import { useEffect } from 'react'
import { useAppBarTitle } from '@/context/AppBarTitleContext';

const page = () => {
    const { setTitleBar } = useAppBarTitle();
    useEffect(() => {
        setTitleBar('Diseases');
    }, []);

    return (
        <DiseaseListView />
    )
}

export default page