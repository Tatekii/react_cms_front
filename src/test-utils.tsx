import { AuthContext } from "@/auth/auth-context";
import { ReactNode, useState, ReactElement, FC } from "react";
import { User, AuthForm } from "@/types";
import * as auth from "@/auth/auth-handler";
import { RenderOptions, render } from "@testing-library/react";

// 提供登录态的provider
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    _id: "62675b90491b89724772c742",
    username: "admin",
    create_time: 1650940816395,
    role: { menus: [] },
  });

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  return (
    <AuthContext.Provider
      children={children}
      value={{
        user,
        login,
        logout,
      }}
    />
  );
};
export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  <AuthProvider>{children}</AuthProvider>;
};
// 没有登录态的provider
const UnAuthProvider = ({ children }: { children: ReactNode }) => {
  return <AuthContext.Provider children={children} value={{ user: null }} />;
};
export const UnAuthWrapper = ({ children }: { children: ReactNode }) => {
  return <UnAuthProvider>{children}</UnAuthProvider>;
};

// 包含authProvider和路由provider的render
const AllTheProviders: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <AuthProvider>{children}</AuthProvider>;
};
/** 包含xxxProvider的render函数 */
export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });
// 也导出"@testing-library/react";
export * from "@testing-library/react";
