import React, { useState, ReactNode, useContext } from "react";
import * as auth from "./auth-handler";
import { AuthForm } from "./types";
import { User } from "./types";
import useMount from "../hooks/useMount";

/** auth context 主体 */
const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

/** auth provider */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    bootStrap().then(setUser);
  });

  return (
    <AuthContext.Provider children={children} value={{ user, login, logout }} />
  );
};

/** auth context 消费Hook */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use context in your provider!");
  }
  return context;
};

/** 初始化 user + 自动登录 */
const bootStrap = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    // TODO
    // 用token去拿用户 没过期自动登录
    user = {
      _id: "62675b90491b89724772c742",
      username: "admin",
      create_time: 1650940816395,
      role: { menus: [] },
    };
  }
  return user;
};
