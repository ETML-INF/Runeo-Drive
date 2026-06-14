import { useState, useEffect } from "react";

const BACKENDS_URL = "https://raw.githubusercontent.com/ETML-INF/Runeo-Drive/main/assets/backends.json";

const FALLBACK = [{ label: "Ailleurs", value: "" }];

export type Backend = { label: string; value: string };

export const useBackendList = () => {
  const [backends, setBackends] = useState<Backend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BACKENDS_URL)
      .then((res) => res.json())
      .then((data: Backend[]) => setBackends(data))
      .catch(() => setBackends(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return { backends, loading };
};
