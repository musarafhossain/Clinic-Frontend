'use client'
import PaymentHistoryListView from '@/sections/payment-history/view/payment-history-list-view';
import { useEffect } from 'react'
import { useAppBarTitle } from '@/context/AppBarTitleContext';

const page = () => {
    const { setTitleBar } = useAppBarTitle();
    useEffect(() => {
        setTitleBar('Payment History');
    }, []);

    return (
        <PaymentHistoryListView />
    )
}

export default page;