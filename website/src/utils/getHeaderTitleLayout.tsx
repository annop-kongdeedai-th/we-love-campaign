import { Pathname } from 'history';

export const getHeaderTitleLayout = (pathname: Pathname) => {
  if (pathname.includes('/account-edit')) {
    return 'อัพเดทโปรไฟล์';
  } else if (pathname.includes('/')) {
    return 'WE LOVE CAMPAIGN';
  } else if (pathname.includes('/admin-user')) {
    return 'ผู้ใช้งาน';
  } else if (pathname.includes('/admin-campaign')) {
    return 'แคมเปญ';
  } else if (pathname.includes('/campaign')) {
    return 'แคมเปญ';
  }
};
