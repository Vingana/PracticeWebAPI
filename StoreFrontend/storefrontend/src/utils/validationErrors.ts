import type { AxiosError } from 'axios';
interface ValidationProblemDetails {
  title?: string;
  status?: number;
  errors?: Record<string, string[]>;
}
export function extractValidationErrors(error: unknown): string[] {
  const axiosError = error as AxiosError<ValidationProblemDetails>;
  if (axiosError?.response?.status === 400) {
    const data = axiosError.response.data;
    if (data?.errors && typeof data.errors === 'object') {
      return Object.values(data.errors).flat();
    }
    const anyData = data as Record<string, unknown>;
    if (typeof anyData?.error === 'string' && anyData.error.length > 0) {
      return [anyData.error];
    }
    if (typeof (data as unknown) === 'string' && (data as unknown as string).length > 0) {
      return [data as unknown as string];
    }
  }
  if (axiosError?.response?.status) {
    return [`Server error (${axiosError.response.status}). Please try again.`];
  }
  if (axiosError?.message) {
    return [axiosError.message];
  }
  return ['An unexpected error occurred.'];
}
export function extractFieldErrors(error: unknown): Record<string, string[]> {
  const axiosError = error as AxiosError<ValidationProblemDetails>;
  if (axiosError?.response?.status === 400) {
    const data = axiosError.response.data;
    if (data?.errors && typeof data.errors === 'object') {
      return Object.fromEntries(
        Object.entries(data.errors).map(([key, msgs]) => [key.toLowerCase(), msgs])
      );
    }
  }
  return {};
}
