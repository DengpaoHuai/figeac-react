import { createBrowserRouter, redirect } from "react-router";
import PlanetList from "../pages-old/PlanetList";
import DemoPage from "../pages-old/DemoPage";
import CreateRando from "../pages-old/CreateRando";
import ListRando from "../pages-old/ListRandoPage";
import DetailRando from "../pages-old/DetailRando";
import EditRando from "../pages-old/EditRando";
import { QueryClient } from "@tanstack/react-query";
import { getRando } from "../services/rando.service";
import { randoConfig } from "../features/rando/api/get-rando";

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      element: <PlanetList />,
    },
    {
      path: "/demo",
      element: <DemoPage />,
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
        {
          path: ":id",
          children: [
            {
              path: "",
              element: <DetailRando />,
            },
            {
              path: "edit",
              element: <EditRando></EditRando>,
              loader: async () => {
                await queryClient.prefetchQuery(randoConfig);

                // redirect("/rando");
              },
            },
          ],
        },
      ],
    },
  ]);

export default createAppRouter;
