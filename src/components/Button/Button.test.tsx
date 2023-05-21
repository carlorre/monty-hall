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
    const { getByTestId } = render(
      <form onSubmit={mockFunction}>
        <Button type="submit" label="" />
      </form>
    );
    const button = getByTestId("button") as HTMLButtonElement;
    fireEvent.click(button);
    expect(mockFunction).toHaveBeenCalled();
  });
});
