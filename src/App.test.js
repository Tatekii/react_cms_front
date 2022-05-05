import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("render App", () => {
  test("render root", () => {
    render(<App />);
    console.log(screen.body.innerHTML);
  });
});
