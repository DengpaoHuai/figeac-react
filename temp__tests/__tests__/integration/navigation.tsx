import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import { renderWithProviders } from "../../test/utils";
import * as randoService from "../../services/rando.service";

// Mock des services
vi.mock("../../services/rando.service", () => ({
  getRando: vi.fn(),
  getRandoById: vi.fn(),
  createRando: vi.fn(),
  updateRando: vi.fn(),
  deleteRando: vi.fn(),
}));

// Mock de react-router pour pouvoir tester la navigation
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("Navigation entre les pages", () => {
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
    (randoService.getRandoById as any).mockImplementation((id) =>
      Promise.resolve(mockRandos.find((rando) => rando._id === id))
    );
  });

  it("devrait naviguer de la liste des randonnées vers la page de détail", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<App />, { route: "/rando" });

    // Attendre que la liste des randonnées soit chargée
    await waitFor(() => {
      expect(screen.getByText("Liste des randonnées")).toBeInTheDocument();
    });

    // Vérifier que les randonnées sont affichées
    expect(screen.getByText("Randonnée 1")).toBeInTheDocument();

    // Cliquer sur le lien de détail de la première randonnée
    const detailLinks = screen.getAllByText("Détail");
    await user.click(detailLinks[0]);

    // Vérifier que la page de détail s'affiche
    await waitFor(() => {
      expect(randoService.getRandoById).toHaveBeenCalledWith("123");
    });
  });

  it("devrait naviguer de la liste des randonnées vers la page d'édition", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<App />, { route: "/rando" });

    // Attendre que la liste des randonnées soit chargée
    await waitFor(() => {
      expect(screen.getByText("Liste des randonnées")).toBeInTheDocument();
    });

    // Cliquer sur le lien d'édition de la première randonnée
    const editLinks = screen.getAllByText("Editer");
    await user.click(editLinks[0]);

    // Vérifier que la page d'édition s'affiche avec les données préchargées
    await waitFor(() => {
      expect(randoService.getRandoById).toHaveBeenCalledWith("123");
    });
  });

  it("devrait naviguer vers la page de création de randonnée", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<App />, { route: "/rando" });

    // Attendre que la liste des randonnées soit chargée
    await waitFor(() => {
      expect(screen.getByText("Liste des randonnées")).toBeInTheDocument();
    });

    // Cliquer sur le lien de création
    await user.click(screen.getByText("Créer une randonnée"));

    // Vérifier que la page de création s'affiche
    await waitFor(() => {
      expect(
        screen.getByText("Créer une nouvelle randonnée")
      ).toBeInTheDocument();
    });
  });
});
