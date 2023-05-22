import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("should render label", () => {
    render(<Button label="Click me" />);
    expect(screen.getByText("Click me")).toBeDefined();
  });

  it("pressing button should submit form", () => {
    const mockFunction = vi.fn((e) => e.preventDefault());
    render(
      <form onSubmit={mockFunction}>
        <Button type="submit" label="submit" />
      </form>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(mockFunction).toHaveBeenCalled();
  });

  it("pressing button should not trigger action when disabled", () => {
    const mockFunction = vi.fn();
    render(<Button label="Click me" onClick={mockFunction} disabled />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockFunction).not.toHaveBeenCalled();
  });
});
