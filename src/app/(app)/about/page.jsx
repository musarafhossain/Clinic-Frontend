'use client'
import AboutView from '@/sections/about/view/about-view';
import { useEffect } from 'react'
import { useAppBarTitle } from '@/context/AppBarTitleContext';

const page = () => {
    const { setTitleBar } = useAppBarTitle();
    useEffect(() => {
        setTitleBar('About');
    }, []);

    return (
        <AboutView />
    )
}

export default page