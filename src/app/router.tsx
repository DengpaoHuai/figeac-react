import { createBrowserRouter, redirect } from "react-router";
import CreateRando from "../pages-old/CreateRando";
import ListRando from "../pages-old/ListRandoPage";
import { QueryClient } from "@tanstack/react-query";
import PlanetList from "./routes";

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
          element: <ListRando />,
        },
        {
          path: "create",
          element: <CreateRando />,
        },
      ],
    },
  ]);

export default createAppRouter;
