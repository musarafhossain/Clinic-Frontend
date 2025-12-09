import type { Metadata } from 'next';
import ForgotPasswordView from '@/sections/auth/view/forgot-password-view';
import { Config } from '@/Config';

export const metadata: Metadata = { title: `Forgot Password | ${Config.APP.NAME}` };

export default function Page() {
  return <ForgotPasswordView />;
}
