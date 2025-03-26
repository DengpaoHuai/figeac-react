import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import DemoComponent from "../../components/DemoComponent";

describe("DemoComponent", () => {
  const defaultProps = {
    content: {
      title: "Content Title",
      content: "Sample content text",
    },
  };

  it("devrait afficher le titre par défaut si aucun titre n'est fourni", () => {
    render(<DemoComponent {...defaultProps} />);

    expect(screen.getByText("Default title")).toBeInTheDocument();
    expect(screen.getByText("Sample content text")).toBeInTheDocument();
  });

  it("devrait afficher le titre personnalisé si fourni", () => {
    render(<DemoComponent {...defaultProps} title="Custom Title" />);

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Sample content text")).toBeInTheDocument();
  });

  it("devrait afficher les enfants si fournis", () => {
    render(
      <DemoComponent {...defaultProps}>
        <div data-testid="child-element">Child Content</div>
      </DemoComponent>
    );

    expect(screen.getByText("Default title")).toBeInTheDocument();
    expect(screen.getByText("Sample content text")).toBeInTheDocument();
    expect(screen.getByTestId("child-element")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it('devrait logger "coucou" à la console', () => {
    // Espionnage de console.log
    const consoleSpy = vi.spyOn(console, "log");

    render(<DemoComponent {...defaultProps} />);

    expect(consoleSpy).toHaveBeenCalledWith("coucou");
    consoleSpy.mockRestore();
  });
});
