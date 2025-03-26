import { RouterProvider } from "react-router";
import router, { createAppRouter } from "./router/router";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { useMemo } from "react";
import { PrimeReactProvider } from "primereact/api";
import { ModalContextProvider } from "./contexts/ModalContextProvider";

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

function App() {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return (
    <>
      <ModalContextProvider>
        <PrimeReactProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </PrimeReactProvider>
      </ModalContextProvider>
    </>
  );
}

export default App;
