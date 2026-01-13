'use client'
import HomeView from '@/sections/home/view/home-view'
import { useEffect } from 'react'
import { useAppBarTitle } from '@/context/AppBarTitleContext';
import { Config } from '@/Config';

const page = () => {
  const { setTitleBar } = useAppBarTitle();
    useEffect(() => {
        setTitleBar(Config.APP.NAME);
    }, []);

  return (
    <HomeView />
  )
}

export default page