import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlanetList from "../../pages-old/PlanetList";
import { renderWithProviders } from "../../test/utils";

// Mock de fetch
vi.stubGlobal("fetch", vi.fn());

describe("PlanetList", () => {
  const mockPlanetsPage1 = {
    count: 60,
    next: "https://swapi.dev/api/planets/?page=2",
    previous: null,
    results: [
      {
        name: "Tatooine",
        rotation_period: "23",
        orbital_period: "304",
        diameter: "10465",
        climate: "arid",
        gravity: "1 standard",
        terrain: "desert",
        surface_water: "1",
        population: "200000",
        residents: [],
        films: [],
        created: "2014-12-09T13:50:49.641000Z",
        edited: "2014-12-20T20:58:18.411000Z",
        url: "https://swapi.dev/api/planets/1/",
      },
      {
        name: "Alderaan",
        rotation_period: "24",
        orbital_period: "364",
        diameter: "12500",
        climate: "temperate",
        gravity: "1 standard",
        terrain: "grasslands, mountains",
        surface_water: "40",
        population: "2000000000",
        residents: [],
        films: [],
        created: "2014-12-10T11:35:48.479000Z",
        edited: "2014-12-20T20:58:18.420000Z",
        url: "https://swapi.dev/api/planets/2/",
      },
    ],
  };

  const mockPlanetsPage2 = {
    count: 60,
    next: "https://swapi.dev/api/planets/?page=3",
    previous: "https://swapi.dev/api/planets/?page=1",
    results: [
      {
        name: "Yavin IV",
        rotation_period: "24",
        orbital_period: "4818",
        diameter: "10200",
        climate: "temperate, tropical",
        gravity: "1 standard",
        terrain: "jungle, rainforests",
        surface_water: "8",
        population: "1000",
        residents: [],
        films: [],
        created: "2014-12-10T11:37:19.144000Z",
        edited: "2014-12-20T20:58:18.421000Z",
        url: "https://swapi.dev/api/planets/3/",
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve(mockPlanetsPage1),
    });
  });

  it("devrait afficher la liste des planètes", async () => {
    renderWithProviders(<PlanetList />);

    // Vérifier le titre
    expect(screen.getByText("Planètes de Star Wars")).toBeInTheDocument();

    // Vérifier que les planètes sont affichées
    await waitFor(() => {
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
      expect(screen.getByText("Alderaan")).toBeInTheDocument();
    });

    // Vérifier les boutons de pagination
    expect(screen.getByText("Page précédente")).toBeDisabled();
    expect(screen.getByText("Page suivante")).not.toBeDisabled();
  });

  it("devrait naviguer vers la page suivante", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PlanetList />);

    // Attendre que les données soient chargées
    await waitFor(() => {
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
    });

    // Mock du fetch pour la page suivante
    (fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve(mockPlanetsPage2),
    });

    // Cliquer sur le bouton page suivante
    await user.click(screen.getByText("Page suivante"));

    // Vérifier que fetch a été appelé avec la bonne URL
    expect(fetch).toHaveBeenCalledWith("https://swapi.dev/api/planets/?page=2");

    // Vérifier que les nouvelles planètes sont affichées
    await waitFor(() => {
      expect(screen.getByText("Yavin IV")).toBeInTheDocument();
      expect(screen.queryByText("Tatooine")).not.toBeInTheDocument();
    });

    // Vérifier les boutons de pagination
    expect(screen.getByText("Page précédente")).not.toBeDisabled();
    expect(screen.getByText("Page suivante")).not.toBeDisabled();
  });
});
