import { SimilarPokemonCard } from "@/components/pokemon-card";
import { SpinnerSm } from "@/components/spinner";
import { fetchPokemonCardTypes } from "@/utils";
import { PokemonValues } from "@/utils/types";
import { useEffect, useState } from "react";

export function SimilarTabDetails({
  types,
}: {
  types?: { type: { name: string; url: string } }[];
}) {
  const [loading, setLoading] = useState(false);
  const [similarPokemons, setSimilarPokemons] = useState<
    { pokemon: PokemonValues }[]
  >([]);
  const typeId = types?.[0].type.name;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await fetchPokemonCardTypes(types?.[0].type.url!);
      setSimilarPokemons(data?.pokemon?.slice(0, 2));

      setLoading(false);
    }

    if (typeId) {
      fetchData();
    }
  }, [typeId]);

  return (
    <div className="similar_pokemon_card_display_container">
      {loading ? (
        <SpinnerSm />
      ) : (
        similarPokemons?.map((similarPokemon, index) => {
          return (
            <SimilarPokemonCard
              key={index}
              similarPokemon={similarPokemon.pokemon}
            />
          );
        })
      )}
    </div>
  );
}
