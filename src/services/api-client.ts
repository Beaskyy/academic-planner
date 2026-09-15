export async function fetchWithAuthHandling(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const response = await fetch(input, init);

  if (response.status === 401 && typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth:unauthorized"));
  }

  if (response.status === 403 && typeof window !== "undefined") {
    void response
      .clone()
      .json()
      .then((body: { message?: string }) => {
        const message =
          body?.message || "You do not have permission to perform this action.";
        window.dispatchEvent(
          new CustomEvent("auth:forbidden", { detail: message }),
        );
      })
      .catch(() => {
        window.dispatchEvent(
          new CustomEvent("auth:forbidden", {
            detail: "You do not have permission to perform this action.",
          }),
        );
      });
  }

  return response;
}
