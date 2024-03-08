import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { SEARCH } from "@/utils/constants";
import { Input } from "@/components/input";
import pokemonGroup from "@assets/images/pokemon-group.png";
import { useNavigateParams } from "@/utils/hooks/use-navigate";

export const HomeViewForm = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigateParams();

  const navigateHandler = () => {
    navigate(ROUTES.LIST, { [SEARCH]: searchValue });
  };

  return (
    <div className="home_view_form_container">
      <div className="home_view_pokemon_group">
        <img src={pokemonGroup} alt="Group of pokemons" />
      </div>

      <h1 className="home_view_title">
        Poké<span>book</span>
      </h1>
      <p className="home_view_description">
        Largest Pokémon index with information about every Pokemon you can think
        of.
      </p>

      <div className="home_view_form_input_container">
        <Input
          onChange={(e) => setSearchValue(e.target.value)}
          onButtonClick={navigateHandler}
        />
      </div>

      <Link to={ROUTES.LIST} className="home_view_form_link">
        View all
      </Link>
    </div>
  );
};
