'use client'
import UserCreateView from '@/sections/users/view/user-create-view';
import { useEffect } from 'react'
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { paths } from '@/routes/paths';

const page = () => {
    const { setTitleBar } = useAppBarTitle();

    useEffect(() => {
        setTitleBar('Add User', paths.user.root);
    }, []);

    return <UserCreateView />;
}

export default page;
