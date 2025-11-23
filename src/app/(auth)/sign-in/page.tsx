import type { Metadata } from 'next';
import SignInView from '@/sections/auth/view/sign-in-view';

export const metadata: Metadata = { title: `Sign in` };

export default function Page() {
  return <SignInView />;
}
