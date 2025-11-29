'use client'
import ListView from '@/sections/users/view/list-view';
import { useEffect } from 'react'
import { useAppBarTitle } from '@/context/AppBarTitleContext';

const page = () => {
    const { setTitle } = useAppBarTitle();
    useEffect(() => {
        document.title = 'Users';
        setTitle('Users');
    }, []);

    return (
        <ListView />
    )
}

export default page