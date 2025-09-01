import { useState, useCallback, startTransition } from "react";
import { toast } from "sonner";
import { ApiResponse, ApiResponseError, ApiResponseSuccess } from "@/types/api";
import { showToast } from "@/components/common/SuccessToast";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

function isApiResponse(value: unknown): value is ApiResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    ((value as { type: string }).type === "success" ||
      (value as { type: string }).type === "error")
  );
}

export function useServerAction<TArgs extends any[], TResult>(
  actionFn: (...args: TArgs) => Promise<TResult>,
  options?: {
    successMessage?: string;
    defaultErrorMessage?: string;
    onSuccess?: (response: TResult) => void;
    onError?: (error: string | Error | ApiResponseError) => void;
    method?: HttpMethod;
    skipToast?: boolean;
  }
) {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState<TResult | null>(null);

  const execute = useCallback(
    async (...args: TArgs): Promise<TResult> => {
      setIsPending(true);
      let response: TResult;
      try {
        response = await actionFn(...args);
        startTransition(() => {
          if (options?.method === "GET") {
            setData(response);
            options?.onSuccess?.(response);
          } else {
            if (isApiResponse(response)) {
              const apiResponse: ApiResponse = response;
              if (apiResponse.type === "success") {
                if (!options?.skipToast) {
                  const msg = (apiResponse as ApiResponseSuccess).message;
                  const toastMessage =
                    typeof msg === "string"
                      ? msg
                      : typeof msg === "object" && msg !== null && "message" in msg
                        ? String((msg as any).message)
                        : options?.successMessage || "Operation successful!";
                  showToast("success","Success",toastMessage)

                }
                options?.onSuccess?.(response);
                setData(response);
              } else {
                const errorMessage =
                  (apiResponse as ApiResponseError).message ||
                  options?.defaultErrorMessage ||
                  "An unexpected error occurred.";
                if (!options?.skipToast) {
                  showToast("error","Error",errorMessage)
                }
                options?.onError?.(apiResponse as ApiResponseError);
                setData(null);
              }
            } else {
              setData(response);
              options?.onSuccess?.(response);
            }
          }
        });
        return response;
      } catch (error: any) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : String(error) ||
            options?.defaultErrorMessage ||
            "An unknown error occurred.";

        startTransition(() => {
          if (!(options?.method === "GET" || options?.skipToast)) {
            showToast("error","Error",errorMessage)
          }
          options?.onError?.(error instanceof Error ? error : new Error(errorMessage));
          setData(null);
        });
        return error;
      } finally {
        startTransition(() => {
          setIsPending(false);
        });
      }
    },
    [actionFn, options]
  );

  return { isPending, execute, data };
}