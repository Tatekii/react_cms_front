import {
  getToken,
  localStorageKey,
  login,
  logout,
  handleUserResponse,
} from "./auth-handler";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { message } from "antd";
import { render } from "nprogress";

afterEach(() => {
  localStorage.clear();
});

const server = setupServer(
  rest.post("api/login", (req, res, ctx) => {
    if (req.user === "ok") {
      return res(
        ctx.json({
          status: 0,
          data: {
            user: {
              username: "test ok",
            },
          },
        })
      );
    } else {
      return res(
        ctx.json({
          status: 500,
          data: {
            user: {
              username: "test notok",
            },
          },
        })
      );
    }
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("测试token存取", () => {
  it("读取token", () => {
    localStorage.setItem(localStorageKey, "xxx");
    const res = getToken();
    expect(res).toBe("xxx");
  });

  it("读取空token", () => {
    const res = getToken();
    expect(res).toBe(undefined);
  });
});

describe("测试处理成功的登录请求", () => {
  it("请求成功的token自动保存到storage", () => {
    const mockData = { data: { token: "mmm", user: "testuser" } };
    const res = handleUserResponse(mockData);
    const localToken = getToken();
    expect(res).toBe("testuser");
    expect(localToken).toBe("mmm");
  });
});

describe("测试登陆方法", () => {
  it("登录失败,返回空且localStorage中无token", async () => {
    const res = await login({ username: "notok", password: "2" });
    expect(getToken()).toBe(undefined);
    expect(res).toBe(undefined);
  });

  it("登录成功,返回用户信息且存储token", async () => {
    const res = await login({ username: "ok", password: "1" });
    expect(getToken()).toBe(undefined);
    expect(res).toBe(undefined);
  });
});

describe("测试登出方法", () => {
  it("登出后,清除保存的token", async () => {
    localStorage.setItem(localStorageKey, "__has_token__");
    await logout();
    expect(getToken()).toBe(undefined);
  });
});
