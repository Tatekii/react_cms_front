/** 鉴权相关方法 */
import { message } from "antd";
import { AxiosResponse } from "http";
import store from "store";
import http from "../api/http";
import { AuthForm } from "./types";

const localStorageKey = "__auth_provider_token__";

export const getToken = () => store.get(localStorageKey);

const handleUserResponse = ({ data }: AxiosResponse) => {
  store.set(localStorageKey, data.token || "");
  return data.user;
};
/** 登录 */
export const login = async ({ username, password }: AuthForm) =>
  await http.post(`api/login`, { username, password }).then((r) => {
    if (r.status !== 0) {
      message.error("登录失败", 2);
      return;
    }
    message.success("登录成功", 2);
    return handleUserResponse(r);
  });
/** 登出 */
export const logout = async () => store.remove(localStorageKey);
