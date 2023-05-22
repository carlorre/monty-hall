import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  it("should render label", () => {
    render(<Checkbox label="Toggle me" />);
    expect(screen.getByText("Toggle me")).toBeDefined();
  });

  it("should call onChange when the checkbox is clicked", () => {
    const mockFunction = vi.fn();
    render(<Checkbox label="Toggle me" onChange={mockFunction} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockFunction).toHaveBeenCalled();
  });

  it("should update value when checkbox or label clicked", () => {
    render(<Checkbox label="test checkbox" />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    const checkboxLabel = screen.getByLabelText("test checkbox");
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkboxLabel);
    expect(checkbox.checked).toBe(false);
  });
});
