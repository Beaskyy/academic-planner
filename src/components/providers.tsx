"use client";

import React, { useEffect, useState } from "react";
import { SessionProvider, signOut } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const [forbiddenMessage, setForbiddenMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleUnauthorized = () => {
      void signOut({ callbackUrl: "/login" });
    };
    const handleForbidden = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      setForbiddenMessage(message);
      window.setTimeout(() => setForbiddenMessage(null), 4000);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    window.addEventListener("auth:forbidden", handleForbidden);
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
      window.removeEventListener("auth:forbidden", handleForbidden);
    };
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: (failureCount, error: unknown) => {
              const status =
                typeof error === "object" && error !== null && "status" in error
                  ? error.status
                  : undefined;

              // Don't retry on 401 or 403 or 422
              if (status === 401 || status === 403 || status === 422) {
                return false;
              }
              return failureCount < 2;
            },
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        {forbiddenMessage && (
          <div
            role="alert"
            className="fixed right-6 top-6 z-100 max-w-[min(90vw,420px)] rounded-xl bg-[#0b0b0b] px-4 py-3 text-sm text-white shadow-xl"
          >
            {forbiddenMessage}
          </div>
        )}
      </QueryClientProvider>
    </SessionProvider>
  );
}
