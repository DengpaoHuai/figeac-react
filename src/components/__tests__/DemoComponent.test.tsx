import { render, screen } from "@testing-library/react";
import DemoComponent from "../DemoComponent";

describe("DemoComponent", () => {
  it("should render with default title", () => {
    render(<DemoComponent content={{ title: "Title", content: "Content" }} />);
    expect(screen.getByText("Default title")).toBeInTheDocument();
  });

  it("should render with custom title", () => {
    render(
      <DemoComponent
        title="Custom title"
        content={{ title: "Title", content: "Content" }}
      />
    );
    expect(screen.getByText("Custom title")).toBeInTheDocument();
  });

  it("should render with content", () => {
    render(<DemoComponent content={{ title: "Title", content: "Content" }} />);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should render with children", () => {
    render(
      <DemoComponent content={{ title: "Title", content: "Content" }}>
        <div>Children</div>
      </DemoComponent>
    );
    expect(screen.getByText("Children")).toBeInTheDocument();
  });
});
