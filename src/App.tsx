import { RouterProvider } from "react-router";
import router from "./router/router";
import { RandoContextProvider } from "./contexts/RandoContextProvider";

function App() {
  return (
    <RandoContextProvider>
      <RouterProvider router={router} />
    </RandoContextProvider>
  );
}

export default App;
