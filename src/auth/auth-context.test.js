import { useAuth, AuthProvider, bootStrap } from "./auth-context";
import { renderHook, act } from "@testing-library/react-hooks";
import { localStorageKey } from "./auth-handler";
import { cleanup, render } from "@testing-library/react";
// import useMount from "@/hooks/useMount";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe("测试bootstrap", () => {
  it("没有token时,bootStrap返回null用户", async () => {
    const r = await bootStrap();
    expect(r).toBeNull();
  });

  it("有token时,bootStrap返回有效用户", async () => {
    localStorage.setItem(localStorageKey, "__test__");
    const r = await bootStrap();
    expect(r.username).toBe("admin");
  });
});

describe("测试useAuth Hook", () => {
  it("在没有authcontext下调用useAuth抛出错误", async () => {
    const { result } = renderHook(() => useAuth());
    expect(() => {
      throw Error(result.error);
    }).toThrowError("use context in your provider!");
  });

  it("useAuth应该拿到user(null),login(fn),logout(fn)", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const { user, login, logout } = result.current;
    expect(user).toBeNull();
    expect(login).toBeInstanceOf(Function);
    expect(logout).toBeInstanceOf(Function);
  });

  it("有token时取到有效用户信息", async () => {
    localStorage.setItem(localStorageKey, "__token__");
    const TestSon = () => {
      const { user } = useAuth();
      return user ? "hasUser" : "emptyUser";
    };
    const { findByText } = render(
      <AuthProvider>
        <TestSon />
      </AuthProvider>
    );
    expect(await findByText("hasUser")).toBeTruthy();
  });
});
