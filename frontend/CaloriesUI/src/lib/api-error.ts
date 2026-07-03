import axios from "axios";

export class ApiError extends Error {
  status: number;
  data?: unknown;
  cause?: Error;

  constructor(status: number, message: string, data?: unknown, cause?: Error) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.cause = cause;
  }
}

export function handleApiError(error: unknown, context?: string): never {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 500;
    const message = error.response?.data?.message ?? error.response?.data?.error ?? error.message;
    const data = error.response?.data;

    if (context) {
      console.error(`API Error [${context}]:`, { status, message, data });
    }

    throw new ApiError(status, message, data, error);
  }

  if (error instanceof ApiError) {
    if (context) {
      console.error(`API Error [${context}]:`, error);
    }
    throw error;
  }

  console.error("Unexpected error:", error);
  throw new ApiError(500, error instanceof Error ? error.message : "An unexpected error occurred", undefined, error instanceof Error ? error : undefined);
}

export async function apiRequest<T>(request: Promise<{ data: T }>, context?: string): Promise<T> {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    handleApiError(error, context);
  }
}
