'use client';
import { useSearchParams } from 'next/navigation';
import VerifyOtpView from '@/sections/auth/view/verify-otp';
import { Config } from '@/Config';
import { useEffect } from 'react';

const page = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const title = `Verify OTP | ${Config.APP.NAME}`;
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <VerifyOtpView email={email || ''} />;
};

export default page;