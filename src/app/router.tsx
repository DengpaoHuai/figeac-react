import { createBrowserRouter, redirect } from "react-router";
import { QueryClient } from "@tanstack/react-query";
import PlanetList from "./routes";
import ListRandoPage from "./routes/rando";
import CreateRando from "./routes/rando/create";

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      element: <PlanetList />,
    },
    {
      path: "/rando",
      children: [
        {
          path: "",
          element: <ListRandoPage />,
        },
        {
          path: "create",
          element: <CreateRando />,
        },
      ],
    },
  ]);

export default createAppRouter;
