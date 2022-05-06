import App from "./App";
import {
  AuthProviders,
  UnAuthProvider,
  render,
  cleanup,
  waitFor,
} from "@/test-utils";

afterEach(() => {
  cleanup();
});

it("有登录态,进入授权app", async () => {
  const { getByTestId } = render(
    <AuthProviders>
      <App />
    </AuthProviders>
  );
  const _element = await waitFor(() => getByTestId("authenticateApp"), {
    timeout: 2500,
  });
  expect(_element).toBeTruthy();
});

it("无登录态,进入无授权app", async () => {
  const { getByTestId } = render(
    <UnAuthProvider>
      <App />
    </UnAuthProvider>
  );
  // const sleep = () => new Promise(r=>setTimeout(() => {
  // 	r()
  // }, 500))
  // await sleep()
  // 延长waitFor轮询的时间
  const _element = await waitFor(() => getByTestId("unAuthenticateApp"), {
    timeout: 2500,
  });
  expect(_element).toBeTruthy();
});
