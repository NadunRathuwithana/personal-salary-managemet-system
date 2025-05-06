/**
 * API Service Layer
 *
 * This file will contain all API endpoints when connecting to the backend.
 * For now, it's just a placeholder with the structure for future implementation.
 */

// Base API URL - will be set to actual API endpoint when connecting to backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Helper for HTTP errors
class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}

// Fetch helper with error handling
async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new HttpError(
        errorData?.message || `HTTP error ${response.status}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new Error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

// API Services structure (to be implemented with actual endpoints)
export const api = {
  // Income endpoints
  income: {
    getAll: async () => fetchWithErrorHandling<any[]>("/income"),
    getById: async (id: string) => fetchWithErrorHandling<any>(`/income/${id}`),
    create: async (data: any) =>
      fetchWithErrorHandling<any>("/income", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: async (id: string, data: any) =>
      fetchWithErrorHandling<any>(`/income/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: async (id: string) =>
      fetchWithErrorHandling<void>(`/income/${id}`, {
        method: "DELETE",
      }),
  },

  // Settings endpoints
  settings: {
    get: async () => fetchWithErrorHandling<any>("/settings"),
    update: async (data: any) =>
      fetchWithErrorHandling<any>("/settings", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  },

  // Expense tracking endpoints
  expenses: {
    getAll: async () => fetchWithErrorHandling<any[]>("/expenses"),
    getByDate: async (date: string) =>
      fetchWithErrorHandling<any>(`/expenses/date/${date}`),
    getByDateRange: async (startDate: string, endDate: string) =>
      fetchWithErrorHandling<any[]>(
        `/expenses/range?start=${startDate}&end=${endDate}`
      ),
    create: async (data: any) =>
      fetchWithErrorHandling<any>("/expenses", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: async (id: string, data: any) =>
      fetchWithErrorHandling<any>(`/expenses/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: async (id: string) =>
      fetchWithErrorHandling<void>(`/expenses/${id}`, {
        method: "DELETE",
      }),
  },

  // Wallet endpoints
  wallets: {
    getAll: async () => fetchWithErrorHandling<any[]>("/wallets"),
    getById: async (id: string) =>
      fetchWithErrorHandling<any>(`/wallets/${id}`),
    create: async (data: any) =>
      fetchWithErrorHandling<any>("/wallets", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: async (id: string, data: any) =>
      fetchWithErrorHandling<any>(`/wallets/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: async (id: string) =>
      fetchWithErrorHandling<void>(`/wallets/${id}`, {
        method: "DELETE",
      }),
  },
};
