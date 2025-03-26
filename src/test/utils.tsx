import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity,
    },
  },
});

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  route?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  { route = "/", ...renderOptions }: CustomRenderOptions = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </QueryClientProvider>
    );
  };

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient,
  };
}

// Réexporte tout depuis @testing-library/react
export * from "@testing-library/react";
