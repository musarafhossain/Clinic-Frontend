'use client'
import AttendanceView from '@/sections/attendance/view/attendance-list-view';
import { useEffect } from 'react'
import { useAppBarTitle } from '@/context/AppBarTitleContext';

const page = () => {
    const { setTitleBar } = useAppBarTitle();
    useEffect(() => {
        setTitleBar('Attendance');
    }, []);

    return (
        <AttendanceView />
    )
}

export default page