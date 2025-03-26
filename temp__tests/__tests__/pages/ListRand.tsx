import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListRando from "../../pages-old/ListRandoPage";
import { renderWithProviders } from "../../test/utils";
import * as randoService from "../../services/rando.service";

// Mock des services
vi.mock("../../services/rando.service", () => ({
  getRando: vi.fn(),
  deleteRando: vi.fn(),
}));

describe("ListRando", () => {
  const mockRandos = [
    {
      _id: "123",
      name: "Randonnée 1",
      km: 10,
      type: "rando",
    },
    {
      _id: "456",
      name: "Randonnée 2",
      km: 15,
      type: "trail",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (randoService.getRando as any).mockResolvedValue(mockRandos);
  });

  it("devrait afficher la liste des randonnées", async () => {
    renderWithProviders(<ListRando />);

    // Vérifier le titre
    expect(screen.getByText("Liste des randonnées")).toBeInTheDocument();

    // Vérifier que les randonnées sont affichées
    await waitFor(() => {
      expect(screen.getByText("Randonnée 1")).toBeInTheDocument();
      expect(screen.getByText("Randonnée 2")).toBeInTheDocument();
    });

    // Vérifier les liens
    expect(screen.getByText("Créer une randonnée")).toBeInTheDocument();
    expect(screen.getAllByText("Détail").length).toBe(2);
    expect(screen.getAllByText("Editer").length).toBe(2);
    expect(screen.getAllByText("Supprimer").length).toBe(2);
  });

  it("devrait supprimer une randonnée lorsque le bouton supprimer est cliqué", async () => {
    const user = userEvent.setup();
    (randoService.deleteRando as any).mockResolvedValue({ success: true });

    renderWithProviders(<ListRando />);

    // Attendre que les données soient chargées
    await waitFor(() => {
      expect(screen.getByText("Randonnée 1")).toBeInTheDocument();
    });

    // Sélectionner le premier bouton supprimer et cliquer dessus
    const deleteButtons = screen.getAllByText("Supprimer");
    await user.click(deleteButtons[0]);

    // Vérifier que la fonction deleteRando a été appelée avec le bon ID
    expect(randoService.deleteRando).toHaveBeenCalledWith("123");

    // Vérifier que la requête de mise à jour a été déclenchée
    await waitFor(() => {
      expect(randoService.getRando).toHaveBeenCalled();
    });
  });

  it("devrait gérer les erreurs lors de la suppression", async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (randoService.deleteRando as any).mockRejectedValue(
      new Error("Erreur de suppression")
    );

    renderWithProviders(<ListRando />);

    // Attendre que les données soient chargées
    await waitFor(() => {
      expect(screen.getByText("Randonnée 1")).toBeInTheDocument();
    });

    // Sélectionner le premier bouton supprimer et cliquer dessus
    const deleteButtons = screen.getAllByText("Supprimer");
    await user.click(deleteButtons[0]);

    // Vérifier que console.error a été appelé avec l'erreur
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it("devrait avoir des liens de navigation fonctionnels", async () => {
    renderWithProviders(<ListRando />);

    // Attendre que les données soient chargées
    await waitFor(() => {
      expect(screen.getByText("Randonnée 1")).toBeInTheDocument();
    });

    // Vérifier les liens et leurs attributs href
    const createLink = screen.getByText("Créer une randonnée");
    expect(createLink.getAttribute("href")).toBe("/rando/create");

    const detailLinks = screen.getAllByText("Détail");
    expect(detailLinks[0].getAttribute("href")).toBe("/rando/123");

    const editLinks = screen.getAllByText("Editer");
    expect(editLinks[0].getAttribute("href")).toBe("/rando/123/edit");
  });
});
