import { fetchPokemons, handleGetPersistedPokemons } from "..";
import { useEffect, useState } from "react";

export function useQueryPokemons() {
  const [loading, setLoading] = useState(false);
  const persistedPokemons = handleGetPersistedPokemons();

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      await fetchPokemons();
      setLoading(false);
    }

    if (!persistedPokemons?.length || persistedPokemons?.length === 0) {
      fetch();
    } else {
      return;
    }
  }, []);

  return { loading };
}
