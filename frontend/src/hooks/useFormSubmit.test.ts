import { act, renderHook } from "@testing-library/react";
import axios from "axios";
import useFormSubmit from "./useFormSubmit";
import { describe, expect, it, vi } from "vitest";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useFormSubmit", () => {
  it("should handle form submission and update loading state and tableData", async () => {
    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        data: {
          numberOfSimulations: 100,
          wins: 50,
          losses: 50,
          winPercentage: 50,
          lossPercentage: 50,
        },
      })
    );

    const { result } = renderHook(() => useFormSubmit());

    await act(async () => result.current.handleSubmit(100, true));

    expect(result.current.loading).toBe(false);

    expect(result.current.tableData).toEqual([
      { heading: "Number of simulations", value: 100 },
      { heading: "Wins", value: 50 },
      { heading: "Losses", value: 50 },
      { heading: "Win percentage", value: 50 },
      { heading: "Loss percentage", value: 50 },
    ]);
  });

  it("should handle form submission error and log the error", async () => {
    mockedAxios.post.mockReturnValue(Promise.reject(new Error("API Error")));

    const { result } = renderHook(() => useFormSubmit());

    await act(async () => result.current.handleSubmit(100, true));

    expect(result.current.loading).toBe(false);

    expect(result.current.tableData).toEqual([]);
  });
});
