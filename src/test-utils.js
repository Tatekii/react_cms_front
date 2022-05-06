import { render } from "@testing-library/react";
import { AuthProvider } from "@/auth/auth-context";

const AppProviders = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export const authRender = (ui, options = {}) =>
  render(ui, { wrapper: AppProviders, ...options });

export * from "@testing-library/react";
