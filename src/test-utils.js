import { AuthContext } from "@/auth/auth-context";

// 提供登录态的provider
export const AuthProviders = ({ children }) => {
  return (
    <AuthContext.Provider
      children={children}
      value={{
        user: {
          _id: "62675b90491b89724772c742",
          username: "admin",
          create_time: 1650940816395,
          role: { menus: [] },
        },
      }}
    />
  );
};

// 没有登录态的provider
export const UnAuthProvider = ({ children }) => {
  return <AuthContext.Provider children={children} value={{ user: null }} />;
};

// 也导出"@testing-library/react";
export * from "@testing-library/react";
