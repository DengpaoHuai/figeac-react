import { createBrowserRouter } from "react-router";
import PlanetList from "../pages/PlanetList";
import DemoPage from "../pages/DemoPage";
import CreateRando from "../pages/CreateRando";
import ListRando from "../pages/ListRando";
import DetailRando from "../pages/DetailRando";

const router = createBrowserRouter([
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
            element: <div>Edit</div>,
          },
        ],
      },
    ],
  },
]);

export default router;
