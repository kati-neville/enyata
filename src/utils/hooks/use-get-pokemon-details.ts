import { useQuery } from "react-query";
import { fetchPokemonCardData } from "..";
import { PokemonData } from "../types";

export const useGetPokemonDetails = (name: string, enabled?: boolean) => {
  const { isLoading, error, data, refetch } = useQuery<PokemonData>(
    name,
    async () => {
      const response = await fetchPokemonCardData(name);

      if (response.ok) {
        const data = await response.json();

        return data;
      } else {
        throw new Error("Failed, to fetch data");
      }
    },
    { enabled: enabled || false },
  );

  //@ts-ignore
  return { data, isLoading, errorMessage: error?.message, refetch };
};
