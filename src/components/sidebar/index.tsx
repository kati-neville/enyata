import "./sidebar.css";
import { TAB_VALUES, Tabs } from "./tabs";
import leftArrow from "@assets/svgs/arrow-left.svg";
import { TabDataWrapper } from "./tab-data-wrapper";
import { useSearchParams } from "react-router-dom";
import { ID, TAB } from "@/utils/constants";
import { Badge } from "../badge";
import { Modal } from "../modal";
import { useEffect, useState } from "react";
import { getDominantColor, resolveTypeIcon } from "@/utils";
import { AboutTabDetails } from "./sections/about";
import { StatsTabDetails } from "./sections/stats";
import { SimilarTabDetails } from "./sections/similar";
import { SpinnerSm } from "../spinner";
import { useGetPokemonDetails } from "@/utils/hooks/use-get-pokemon-details";

export const SideBar = () => {
  const [rgb, setRgb] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get(TAB) as TAB_VALUES;
  const queryId = searchParams.get(ID);
  const { data: pokemonData, isLoading } = useGetPokemonDetails(
    queryId || "",
    true,
  );

  const navigateHandler = () => {
    setSearchParams((params) => {
      params.delete(ID);
      return params;
    });
  };

  useEffect(() => {
    getDominantColor(pokemonData?.sprites?.front_default!, setRgb);
  }, [queryId, pokemonData]);

  return (
    <Modal
      open={!!queryId}
      onClose={navigateHandler}
      variant="side"
      className="sidebar_container"
    >
      {isLoading || !pokemonData ? (
        <SpinnerSm />
      ) : (
        <>
          <div
            className="sidebar_pokemon_image_container"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgb(${rgb?.map((v) => v + 30)}), rgb(${rgb?.map((v) => v - 30)}))`,
            }}
          >
            <button
              onClick={navigateHandler}
              className="sidebar_goback_container"
            >
              <img src={leftArrow} alt="Left arrow" />
            </button>

            <div>
              <img
                src={pokemonData?.sprites?.front_default}
                alt="pokemon"
                className="pokemon_image"
              />
            </div>
          </div>

          <div className="sidebar_pokemon_details">
            <h1 className="pokemon_name">{queryId || ""}</h1>

            <div className="pokemon_types">
              {pokemonData.types?.map(({ type }, index) => {
                return (
                  <Badge key={index}>
                    {resolveTypeIcon(type.name)} <span>{type.name}</span>
                  </Badge>
                );
              })}
            </div>

            {activeTab === TAB_VALUES.ABOUT.toLowerCase() ? (
              <TabDataWrapper
                title={TAB_VALUES.ABOUT}
                details={
                  <AboutTabDetails
                    height={pokemonData.height || 0}
                    weight={pokemonData.weight || 0}
                    abilities={pokemonData.abilities}
                  />
                }
              />
            ) : null}
            {activeTab === TAB_VALUES.STATS.toLowerCase() ? (
              <TabDataWrapper
                title={TAB_VALUES.STATS}
                details={<StatsTabDetails stats={pokemonData.stats || []} />}
              />
            ) : null}
            {activeTab === TAB_VALUES.SIMILAR.toLowerCase() ? (
              <TabDataWrapper
                title={TAB_VALUES.SIMILAR}
                details={<SimilarTabDetails types={pokemonData.types} />}
              />
            ) : null}
          </div>

          <div className="sidebar_tabs_container">
            <Tabs />
          </div>
        </>
      )}
    </Modal>
  );
};
