import { useMemo } from "react";
import { PokemonValues } from "../types";

export const useFilterData = (search: string, pokemons: PokemonValues[]) => {
  const filteredData = useMemo(() => {
    return pokemons?.filter((pokemon: PokemonValues) => {
      return pokemon.name.toLowerCase().match(search?.toLowerCase());
    });
  }, [pokemons, search]);

  return { filteredData };
};
