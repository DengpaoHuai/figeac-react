import { createBrowserRouter } from "react-router";
import PlanetList from "../pages/PlanetList";
import DemoPage from "../pages/DemoPage";
import CreateRando from "../pages/CreateRando";
import ListRando from "../pages/ListRando";
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
    path: "/create_rando",
    element: <CreateRando />,
  },
  {
    path: "/list_rando",
    element: <ListRando />,
  },
]);

export default router;
