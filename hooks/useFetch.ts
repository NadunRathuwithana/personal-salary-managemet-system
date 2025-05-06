"use client";

import { useState, useEffect } from "react";

// Define the different states for the fetch operation
type Status = "idle" | "loading" | "success" | "error";

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * A custom hook for data fetching with loading and error states.
 * Will be replaced with actual API calls when connecting to backend.
 *
 * @param fetcher - Function that returns the data (will be API call in production)
 * @param dependencies - Optional array of dependencies to trigger refetching
 * @returns Object containing data, loading state, error state, and refetch function
 */
export function useFetch<T>(
  fetcher: () => Promise<T>,
  dependencies: React.DependencyList = []
): UseFetchResult<T> {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setStatus("loading");
    setError(null);

    try {
      const result = await fetcher();
      setData(result);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    data,
    isLoading: status === "loading" || status === "idle",
    isError: status === "error",
    error,
    refetch: fetchData,
  };
}
