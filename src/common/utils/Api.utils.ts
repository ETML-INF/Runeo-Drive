export function apiErrorMessage(error: any): string {
  if (!error?.response) {
    return "Connexion impossible";
  }
  return error.response.data?.error ?? error.response.data?.message ?? error.message;
}
