import { ISignin, ISignup } from "../interfaces/auth";
import instance from "./instance";

export const sigin = (user: ISignin) => {
  return instance.post("/signin", user);
};
export const signup = (user: ISignup) => {
  return instance.post("/signup", user);
};
