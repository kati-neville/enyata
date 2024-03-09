import { useNavigateParams } from "@/utils/hooks/use-navigate";
import { Badge } from "../badge";
import "./pokemon-card.css";
import view from "@assets/svgs/view.svg";
import { ID, TAB } from "@/utils/constants";
import { TAB_VALUES } from "../sidebar/tabs";
import { useInView } from "react-intersection-observer";
import { PokemonValues } from "@/utils/types";
import { useEffect } from "react";
import { resolveTypeIcon } from "@/utils";
import { SpinnerSm } from "../spinner";
import { useSearchParams } from "react-router-dom";
import { useGetPokemonDetails } from "@/utils/hooks/use-get-pokemon-details";
import { ErrorText } from "../error/error-text";

export const PokemonCard = ({ pokemon }: { pokemon: PokemonValues }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigateParams();
  const {
    data: pokemonData,
    refetch: fetchData,
    isLoading,
    errorMessage,
  } = useGetPokemonDetails(pokemon.name);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const allParams: { [key: string]: string } = {};

  searchParams.forEach((value, key) => {
    allParams[key] = value;
  });

  useEffect(() => {
    if (inView) {
      fetchData();
    }
  }, [inView, pokemon.name]);

  const navigateHandler = () => {
    navigate(location.pathname, {
      ...allParams,
      [ID]: pokemon.name,
      [TAB]: TAB_VALUES.ABOUT.toLowerCase(),
    });
  };

  return (
    <div ref={ref} className="pokemon_card_container">
      {isLoading || !inView ? (
        <SpinnerSm />
      ) : (
        <>
          {errorMessage ? (
            <ErrorText text={errorMessage} />
          ) : (
            <>
              <div className="pokemon_card_image_container">
                <img
                  src={pokemonData?.sprites?.front_default}
                  alt="pokemon image"
                  className="pokemon_card_image"
                />
              </div>

              <div className="pokemon_card_details_container">
                <p className="pokemon_card_name">{pokemonData?.name || ""}</p>

                <div className="pokemon_card_types">
                  {pokemonData?.types?.map(({ type }, index) => {
                    return (
                      <Badge key={index}>
                        <span>{resolveTypeIcon(type.name!)}</span>{" "}
                        <span>{type.name}</span>
                      </Badge>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={navigateHandler}
                className="pokemon_card_view_container"
              >
                <div className="pokemon_card_view">
                  <span>View pokemon</span>

                  <img src={view} alt="view icon" />
                </div>
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export const SimilarPokemonCard = ({
  similarPokemon,
}: {
  similarPokemon: PokemonValues;
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const {
    data: pokemonData,
    refetch: fetchData,
    isLoading,
  } = useGetPokemonDetails(similarPokemon.name);

  useEffect(() => {
    if (inView) {
      fetchData();
    }
  }, [inView, similarPokemon]);

  return (
    <>
      <div ref={ref} className="similar_pokemon_card_container">
        {isLoading || !inView ? (
          <SpinnerSm />
        ) : (
          <>
            <div className="similar_pokemon_card_image_container">
              <img
                src={pokemonData?.sprites?.front_default}
                alt="pokemon image"
                className="similar_pokemon_card_image"
              />
            </div>

            <div className="similar_pokemon_card_details_container">
              <p className="similar_pokemon_card_name">{pokemonData?.name}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
