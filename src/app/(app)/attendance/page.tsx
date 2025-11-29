'use client'
import HomeView from '@/sections/home/view/home-view'
import { useEffect } from 'react'
import { useAppBarTitle } from '@/context/AppBarTitleContext';

const page = () => {
    const { setTitle } = useAppBarTitle();
    useEffect(() => {
        document.title = 'Attendance';
        setTitle('Attendance');
    }, []);

    return (
        <HomeView />
    )
}

export default page