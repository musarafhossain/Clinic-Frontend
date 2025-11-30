'use client'
import UserListView from '@/sections/users/view/user-list-view';
import { useEffect } from 'react'
import { useAppBarTitle } from '@/context/AppBarTitleContext';

const page = () => {
    const { setTitleBar } = useAppBarTitle();
    useEffect(() => {
        setTitleBar('Users');
    }, []);

    return (
        <UserListView />
    )
}

export default page