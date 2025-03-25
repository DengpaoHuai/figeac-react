import { useEffect, useState } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPlanets = async () => {
    setIsLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPlanets().catch((error: unknown) => {
      if (error instanceof Error) {
        setError(error);
      } else if (typeof error === "string") {
        setError(new Error(error));
      } else {
        setError(new Error("An unknown error occured"));
      }
    });
  }, []);


  return {
    data,
    isLoading,
    error,
    refetch: fetchPlanets,
  };
};

export default useFetch;
