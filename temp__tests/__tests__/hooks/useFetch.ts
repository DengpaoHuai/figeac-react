import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "../../hooks/useFetch";

// Mock de fetch
vi.stubGlobal("fetch", vi.fn());

describe("useFetch", () => {
  const mockData = { results: ["test"] };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devrait récupérer les données correctement", async () => {
    (fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    });

    const { result } = renderHook(() => useFetch("https://test-api.com/data"));

    // Initialement, le loading doit être true et les données null
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    // Attendre que les données soient chargées
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Vérifier que les données sont maintenant disponibles
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(fetch).toHaveBeenCalledWith("https://test-api.com/data");
  });

  it("devrait gérer les erreurs", async () => {
    const testError = new Error("Fetch error");
    (fetch as any).mockRejectedValueOnce(testError);

    const { result } = renderHook(() => useFetch("https://test-api.com/data"));

    // Attendre que l'erreur soit détectée
    await waitFor(() => {
      expect(result.current.error).not.toBe(null);
    });

    // Vérifier l'état final
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toEqual(testError);
  });

  it("devrait pouvoir refetch les données", async () => {
    // Premier appel
    (fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    });

    const { result } = renderHook(() => useFetch("https://test-api.com/data"));

    // Attendre que les données soient chargées
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Mock pour le refetch
    const newData = { results: ["updated"] };
    (fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve(newData),
    });

    // Appeler refetch
    result.current.refetch();

    // Vérifier que loading est à nouveau true
    expect(result.current.isLoading).toBe(true);

    // Attendre que les nouvelles données soient chargées
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Vérifier les nouvelles données
    expect(result.current.data).toEqual(newData);
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
