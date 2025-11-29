'use client'
import CreateView from '@/sections/users/view/create-view';
import { useEffect } from 'react'
import { useAppBarTitle } from '@/context/AppBarTitleContext';

const page = () => {
    const { setTitle } = useAppBarTitle();
    useEffect(() => {
        document.title = 'Add User';
        setTitle('Add User');
    }, []);

    return (
        <CreateView />
    )
}

export default page