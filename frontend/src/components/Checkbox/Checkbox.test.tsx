import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  it("should render label", () => {
    render(<Checkbox label="Toggle me" />);
    expect(screen.getByText("Toggle me")).toBeDefined();
  });

  it("should update value when checkbox or label clicked", () => {
    const { getByTestId } = render(<Checkbox label="test checkbox" />);
    const checkbox = getByTestId("checkbox") as HTMLInputElement;
    const checkboxLabel = getByTestId("checkbox-label");
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkboxLabel);
    expect(checkbox.checked).toBe(false);
  });
});
