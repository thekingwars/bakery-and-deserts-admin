export interface User {
  _id: string;
  email: string;
  name: string;
  lastName: string;
  fullName: string;
  role: 'admin' | 'user';
}

export interface UserToken {
  access_token: string;
  user: User;
}
