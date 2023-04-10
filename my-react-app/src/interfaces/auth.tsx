export interface ISignin {
  email: string;
  password: string | number;
}
export interface ISignup {
  username: string;
  email: string;
  password: number | string;
  confirmPassword: number | string;
}
