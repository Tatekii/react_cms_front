import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

/** 挂载后加载的根provider */
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
