import { RouterProvider } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { useMemo } from "react";
import { PrimeReactProvider } from "primereact/api";
import { ModalContextProvider } from "./contexts/ModalContextProvider";
import createAppRouter from "./app/router";

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
