import { Pathname } from 'history';

export const isOnAdminMode = (pathname: Pathname) => {
  return pathname.includes('admin');
};

export const isOnAuthMode = (pathname: Pathname) => {
  return pathname.includes('login') || pathname.includes('register');
};
