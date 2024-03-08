import { handleGetPersistedPokemons, handlePersistPokemons } from "..";
import { BASE_URL } from "../constants";
import { useEffect, useState } from "react";

export function useQueryPokemons() {
  const [loading, setLoading] = useState(false);
  const persistedPokemons = handleGetPersistedPokemons();

  async function query() {
    setLoading(true);

    const response = await fetch(`${BASE_URL}/pokemon?limit=500`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();

      handlePersistPokemons(data?.results);
    } else {
      throw new Error("Unable to fetch data, please try again later");
    }

    setLoading(false);
  }

  useEffect(() => {
    async function fetch() {
      await query();
    }

    if (!persistedPokemons?.length || persistedPokemons?.length === 0) {
      fetch();
    } else {
      return;
    }
  }, []);

  return { loading, query };
}
