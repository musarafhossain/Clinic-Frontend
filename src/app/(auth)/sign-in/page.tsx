import type { Metadata } from 'next';
import SignInView from '@/sections/auth/view/sign-in-view';
import { Config } from '@/Config';

export const metadata: Metadata = { title: `Sign in | ${Config.APP.NAME}` };

export default function Page() {
  return <SignInView />;
}
