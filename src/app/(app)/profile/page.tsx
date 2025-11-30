'use client'
import ProfileView from '@/sections/profile/view/profile-view';
import { useEffect } from 'react'
import { useAppBarTitle } from '@/context/AppBarTitleContext';

const page = () => {
    const { setTitleBar } = useAppBarTitle();
    useEffect(() => {
        setTitleBar('Profile');
    }, []);

    return (
        <ProfileView />
    )
}

export default page