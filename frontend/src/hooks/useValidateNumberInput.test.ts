import { useValidateNumberInput } from "./useValidateNumberInput";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("should handle number input correctly", () => {
  it("initial value should be null", () => {
    const { result } = renderHook(() => useValidateNumberInput());
    expect(result.current.number).toBeNull();
  });

  it("should accept a positive integer", () => {
    const { result } = renderHook(() => useValidateNumberInput());
    act(() => result.current.handleChange("1234"));
    expect(result.current.number).toBe(1234);
  });

  it("should be able to handle leading 0s", () => {
    const { result } = renderHook(() => useValidateNumberInput());

    act(() => result.current.handleChange("001"));
    expect(result.current.number).toBe(1);
  });

  it("should return null if input exceeds 10000", () => {
    const { result } = renderHook(() => useValidateNumberInput());

    act(() => result.current.handleChange("10001"));
    expect(result.current.number).toBeNull();
  });

  it("should return null if input is not positive integer", () => {
    const { result } = renderHook(() => useValidateNumberInput());

    const testCases = ["++", "--", "1e3", "-1", "0", "0.1", "", "1 2 3"];

    testCases.forEach((testCase) => {
      act(() => result.current.handleChange(testCase));
      expect(result.current.number).toBeNull();
    });
  });
});
