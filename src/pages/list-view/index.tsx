import { PokemonCard } from "@/components/pokemon-card";
import "./list-view.css";
import { Navbar } from "@/components/navbar";
import { Paginator, limits } from "@/components/paginator";
import { SideBar } from "@/components/sidebar";
import { useSearchParams } from "react-router-dom";
import { LIMIT, PAGE, SEARCH } from "@/utils/constants";
import { useMemo } from "react";
import { handleGetPersistedPokemons } from "@/utils";
import { PokemonValues } from "@/utils/types";
import { useFilterData } from "@/utils/hooks/use-filter-data";

export const ListView = () => {
  const [searchParams] = useSearchParams();
  const pokemonSearch = searchParams.get(SEARCH) || "";
  const currentPage = parseFloat(searchParams.get(PAGE) || "1");
  const persistedPokemons: PokemonValues[] = handleGetPersistedPokemons();
  const limit = parseFloat(searchParams.get(LIMIT) || limits[0].toString());
  const { filteredData } = useFilterData(pokemonSearch, persistedPokemons);

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * limit;
    const lastPageIndex = firstPageIndex + limit;
    return (pokemonSearch ? filteredData : persistedPokemons)?.slice(
      firstPageIndex,
      lastPageIndex,
    );
  }, [currentPage, limit, pokemonSearch]);

  return (
    <>
      <SideBar />
      <div className="list_view_container">
        <Navbar />

        {filteredData?.length === 0 || !persistedPokemons ? (
          <div className="item_display no_data_container">
            <h1>Oops!</h1>
            <p>There is no data to match your search input</p>
          </div>
        ) : (
          <div className="item_display">
            <div className="pokemon_card_display_container">
              {currentData?.map((data, index) => (
                <PokemonCard key={index} pokemon={data} />
              ))}
            </div>
          </div>
        )}

        <div className="list_view_pagination_container">
          <Paginator />
        </div>
      </div>
    </>
  );
};
