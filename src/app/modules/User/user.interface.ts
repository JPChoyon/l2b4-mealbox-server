import { USER_ROLE } from './user.constant';

export type TUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'admin' | 'customer';
  isBlocked: boolean;
};
export type TUserRole = keyof typeof USER_ROLE;
