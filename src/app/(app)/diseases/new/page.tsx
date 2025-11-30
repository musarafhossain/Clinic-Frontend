'use client'
import DiseaseCreateView from '@/sections/disease/view/disease-create-view';
import { useEffect } from 'react'
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { paths } from '@/routes/paths';

const page = () => {
    const { setTitleBar } = useAppBarTitle();

    useEffect(() => {
        setTitleBar('Add Disease', paths.disease.root);
    }, []);

    return <DiseaseCreateView />;
}

export default page;
