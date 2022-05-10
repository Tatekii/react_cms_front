import useMount from "./useMount";
import { render } from "@testing-library/react";

describe("测试useMount hook", () => {
  it("useMount的回调函数应该只会执行一次", () => {
    const cb = jest.fn();
    const Test = () => {
      useMount(cb);
      return <div>Test</div>;
    };
    const { rerender } = render(<Test></Test>);
    rerender(<Test></Test>);

    expect(cb).toBeCalledTimes(1);
  });
});
