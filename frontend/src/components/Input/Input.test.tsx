import { fireEvent, render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import Input from "./Input";

describe("Input", () => {
  it("should render label", () => {
    render(<Input label="Type here" />);
    expect(screen.getByText("Type here")).toBeDefined();
  });

  it("should update value onChange", () => {
    const { getByTestId } = render(<Input label="test" />);
    const inputElement = getByTestId("input") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "123" } });
    expect(inputElement.value).toBe("123");
  });
});
