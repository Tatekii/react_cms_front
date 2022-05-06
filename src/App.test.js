import App from "./App";
import { authRender, screen } from "@/test-utils";
import { localStorageKey } from "@/auth/auth-handler";
import { act } from "@testing-library/react";

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
  localStorage.clear(); //  每个测试结束清除localStorage
});

it("有登录态,进入授权app", async () => {
  // 加入登录态
  localStorage.setItem(
    localStorageKey,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjc1YjkwNDkxYjg5NzI0NzcyYzc0MiIsImlhdCI6MTY1MTgwMjUwMiwiZXhwIjoxNjUyNDA3MzAyfQ.mlwRG9srnKa_zLH2yCIHWpcIt6e0FyiKp5wjHrpWncs"
  );
  authRender(<App />);
  await act(async () => {
    const _element = await screen.findByTestId("authenticateApp");
    expect(_element).toBeTruthy();
  });
});

it("无登录态,进入无授权app", async () => {
  authRender(<App />);
  await act(async () => {
    const _element = await screen.findByTestId("unAuthenticateApp");
    expect(_element).toBeTruthy();
  });
});
