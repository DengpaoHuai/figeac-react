//import "@testing-library/jest-dom/vitest";
import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Nettoyer automatiquement après chaque test
afterEach(() => {
  cleanup();
});
