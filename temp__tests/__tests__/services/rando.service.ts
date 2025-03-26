import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createRando,
  deleteRando,
  getRando,
  getRandoById,
  updateRando,
} from "../../services/rando.service";
import httpClient from "../../lib/http-client";

// Mock du module axios
vi.mock("../../lib/http-client", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Services Rando", () => {
  const mockRando = {
    _id: "123",
    name: "Test Rando",
    km: 10,
    type: "rando",
  };

  const mockRandoInput = {
    name: "Test Rando",
    km: 10,
    type: "rando",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getRando", () => {
    it("devrait récupérer toutes les randonnées", async () => {
      (httpClient.get as any).mockResolvedValueOnce({
        data: [mockRando],
      });

      const result = await getRando();

      expect(httpClient.get).toHaveBeenCalledWith("/rando");
      expect(result).toEqual([mockRando]);
    });

    it("devrait valider les données avec le schéma", async () => {
      (httpClient.get as any).mockResolvedValueOnce({
        data: [{ ...mockRando, extraField: "value" }],
      });

      const result = await getRando();

      expect(result).toEqual([mockRando]);
      expect(result[0]).not.toHaveProperty("extraField");
    });
  });

  describe("getRandoById", () => {
    it("devrait récupérer une randonnée par ID", async () => {
      (httpClient.get as any).mockResolvedValueOnce({
        data: mockRando,
      });

      const result = await getRandoById("123");

      expect(httpClient.get).toHaveBeenCalledWith("/rando/123");
      expect(result).toEqual(mockRando);
    });
  });

  describe("createRando", () => {
    it("devrait créer une nouvelle randonnée", async () => {
      (httpClient.post as any).mockResolvedValueOnce({
        data: mockRando,
      });

      const result = await createRando(mockRandoInput);

      expect(httpClient.post).toHaveBeenCalledWith("/rando", mockRandoInput);
      expect(result).toEqual(mockRando);
    });
  });

  describe("updateRando", () => {
    it("devrait mettre à jour une randonnée existante", async () => {
      (httpClient.put as vi.Mock).mockResolvedValueOnce({
        data: mockRando,
      });

      const result = await updateRando("123", mockRandoInput);

      expect(httpClient.put).toHaveBeenCalledWith("/rando/123", mockRandoInput);
      expect(result).toEqual(mockRando);
    });
  });

  describe("deleteRando", () => {
    it("devrait supprimer une randonnée", async () => {
      vi.useFakeTimers();
      (httpClient.delete as any).mockResolvedValueOnce({
        data: { success: true },
      });

      const deletePromise = deleteRando("123");
      vi.advanceTimersByTime(2000); // avance le timer pour le await waitFor(2000)
      const result = await deletePromise;

      expect(httpClient.delete).toHaveBeenCalledWith("/rando/123");
      expect(result).toEqual({ success: true });
      vi.useRealTimers();
    });
  });
});
