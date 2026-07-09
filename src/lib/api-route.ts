export function apiErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error) {
    if (error.message.includes("MONGODB_URI")) {
      return "Database is not configured on the server.";
    }
    console.error(fallback, error.message);
  } else {
    console.error(fallback, error);
  }
  return fallback;
}
