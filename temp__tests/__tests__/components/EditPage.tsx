import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditPage from "../../components/EditPage";
import { renderWithProviders } from "../../test/utils";

describe("EditPage", () => {
  const mockRando = {
    _id: "123",
    name: "Test Rando",
    km: 10,
    type: "rando" as const,
  };

  it("devrait afficher le formulaire avec les valeurs par défaut", () => {
    renderWithProviders(<EditPage id="123" rando={mockRando} />);

    // Vérifier que le titre est affiché
    expect(screen.getByText("Créer une Randonnée")).toBeInTheDocument();

    // Vérifier que les champs du formulaire contiennent les bonnes valeurs
    expect(screen.getByLabelText(/nom de la randonnée/i)).toHaveValue(
      "Test Rando"
    );
    expect(screen.getByLabelText(/distance/i)).toHaveValue(10);
    expect(screen.getByLabelText(/type de randonnée/i)).toHaveValue("rando");
  });

  it("devrait appeler onSubmit avec les données correctes lors de la soumission", async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();

    const { container } = renderWithProviders(
      <EditPage id="123" rando={mockRando} />
    );

    // Remplacer la fonction onSubmit
    const originalOnSubmit = EditPage.prototype.onSubmit;
    EditPage.prototype.onSubmit = mockOnSubmit;

    // Modifier le champ de nom
    const nameInput = screen.getByLabelText(/nom de la randonnée/i);
    await user.clear(nameInput);
    await user.type(nameInput, "Nouvelle Rando");

    // Modifier le champ de distance
    const kmInput = screen.getByLabelText(/distance/i);
    await user.clear(kmInput);
    await user.type(kmInput, "15");

    // Changer le type
    const typeSelect = screen.getByLabelText(/type de randonnée/i);
    await user.selectOptions(typeSelect, "trail");

    // Soumettre le formulaire
    const submitButton = screen.getByText("Enregistrer");
    await user.click(submitButton);

    // Restaurer la fonction d'origine
    EditPage.prototype.onSubmit = originalOnSubmit;

    // Vérifier que les données ont été soumises
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith({
        name: "Nouvelle Rando",
        km: 15,
        type: "trail",
      });
    });
  });

  it("devrait afficher les erreurs de validation", async () => {
    const user = userEvent.setup();

    renderWithProviders(<EditPage id="123" rando={mockRando} />);

    // Modifier le champ de nom avec une valeur trop courte
    const nameInput = screen.getByLabelText(/nom de la randonnée/i);
    await user.clear(nameInput);
    await user.type(nameInput, "AB");

    // Modifier le champ de distance avec une valeur négative
    const kmInput = screen.getByLabelText(/distance/i);
    await user.clear(kmInput);
    await user.type(kmInput, "-1");

    // Soumettre le formulaire
    const submitButton = screen.getByText("Enregistrer");
    await user.click(submitButton);

    // Vérifier que les erreurs sont affichées
    await waitFor(() => {
      expect(
        screen.getByText(/le nom doit contenir au moins 3 caractères/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/la distance doit être supérieure à 0/i)
      ).toBeInTheDocument();
    });
  });
});
