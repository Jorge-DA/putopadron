import { Secret, sign } from "jsonwebtoken";
import dayjs from "dayjs";
import { IUser } from "../models/user";
import config from "../config/config";

export interface Token {
  sub: string;
  nickname: string;
  role: number;
  iat: number;
  exp: number;
}

export default function createToken(user: IUser) {
  var payload: Token = {
    sub: user._id,
    nickname: user.nickname,
    role: user.role,
    iat: dayjs().unix(),
    exp: dayjs().add(30, "day").unix(),
  };
  return sign(payload, <Secret>config.KEY.SECRET);
}
