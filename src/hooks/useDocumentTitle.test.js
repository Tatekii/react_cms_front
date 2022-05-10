import useDocumentTitle from "./useDocumentTitle";
import { render } from "@testing-library/react";

describe("测试useDocumentTitle hook", () => {
  it("设置新title,并在卸载后还原", () => {
    const Test = () => {
      useDocumentTitle("test title");
      return <div>Test</div>;
    };
    const { unmount } = render(<Test></Test>);
    expect(document.title).toBe("test title");
    unmount();
    expect(document.title).toBe("");
  });
});
