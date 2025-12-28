'use client'
import NotificationListView from '@/sections/notifications/view/notification-list-view';
import { useEffect } from 'react'
import { useAppBarTitle } from '@/context/AppBarTitleContext';

const page = () => {
    const { setTitleBar } = useAppBarTitle();
    useEffect(() => {
        setTitleBar('Notifications');
    }, []);

    return (
        <NotificationListView />
    )
}

export default page