import { fetchSearch } from "@/lib/features/search/searchAPI";

const mockFetch = jest.fn();

global.fetch = mockFetch as unknown as typeof fetch;

describe("fetchSearch", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("throws when the search value is empty", async () => {
    await expect(fetchSearch(" ")).rejects.toThrow("Please provide a city name.");
  });

  it("requests weather and forecast data", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ coord: { lat: 10, lon: 20 } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ list: [] }),
      });

    await fetchSearch("Tokyo");

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch.mock.calls[0][0]).toContain("weather");
    expect(mockFetch.mock.calls[0][0]).toContain("units=metric");
    expect(mockFetch.mock.calls[1][0]).toContain("forecast/daily");
  });
});
