import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import App from "../App";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock des dépendances
vi.mock("react-router", () => ({
  RouterProvider: ({ children }: { children: React.ReactNode }) => children,
  createBrowserRouter: vi.fn(),
}));

vi.mock("../router/router", () => ({
  default: {},
  createAppRouter: vi.fn(() => ({})),
}));

vi.mock("@tanstack/react-query-devtools", () => ({
  ReactQueryDevtools: () => null,
}));

vi.mock("primereact/api", () => ({
  PrimeReactProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="prime-react-provider">{children}</div>
  ),
}));

describe("App", () => {
  it("devrait rendre le composant App avec les bons providers", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    // Vérifier que PrimeReactProvider est présent
    expect(screen.getByTestId("prime-react-provider")).toBeInTheDocument();
  });

  it("devrait créer le router avec le queryClient", () => {
    const createAppRouterMock = vi.spyOn(
      require("../router/router"),
      "createAppRouter"
    );
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    expect(createAppRouterMock).toHaveBeenCalled();
  });
});
