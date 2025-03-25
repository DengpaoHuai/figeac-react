import { createBrowserRouter, redirect } from "react-router";
import PlanetList from "../pages/PlanetList";
import DemoPage from "../pages/DemoPage";
import CreateRando from "../pages/CreateRando";
import ListRando from "../pages/ListRando";
import DetailRando from "../pages/DetailRando";
import EditRando from "../pages/EditRando";
import { QueryClient } from "@tanstack/react-query";
import { getRando } from "../services/rando.service";

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
                await queryClient.prefetchQuery({
                  queryKey: ["randos"],
                  queryFn: getRando,
                });

                // redirect("/rando");
              },
            },
          ],
        },
      ],
    },
  ]);

export default createAppRouter;
