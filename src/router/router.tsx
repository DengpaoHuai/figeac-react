import { createBrowserRouter } from "react-router";
import PlanetList from "../pages/PlanetList";
import DemoPage from "../pages/DemoPage";
import CreateRando from "../pages/CreateRando";

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
]);

export default router;
