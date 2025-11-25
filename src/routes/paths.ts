export const paths = {
  root: '/',
  user: {
    root: `/users`,
    new: `/users/new`,
    edit: (id: string) => `/users/${id}/edit`,
  },
  disease: {
    root: `/diseases`,
    new: `/diseases/new`,
    edit: (id: string) => `/diseases/${id}/edit`,
  },
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  contact: '/contact',
  about: '/about',
  faqs: '/faqs',
  auth: {
    signIn: `/sign-in`,
    verify: `/verify`,
    signUp: `/sign-up`,
    updatePassword: `/update-password`,
    resetPassword: `/reset-password`,
  },
};
