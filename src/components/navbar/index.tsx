import { useNavigate, useSearchParams } from "react-router-dom";
import { ThemeSwitcher } from "../theme-switcher";
import "./navbar.css";
import logoImage from "@assets/images/pokemon-group.png";
import { Input } from "../input";
import { SEARCH } from "@/utils/constants";
import { useNavigateParams } from "@/utils/hooks/use-navigate";

export const Navbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const updateSearchParams = useNavigateParams();
  const pokemonSearch = searchParams.get(SEARCH) || "";

  const allParams: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    allParams[key] = value;
  });

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateSearchParams(location.pathname, {
      ...allParams,
      [SEARCH]: e.target.value,
    });
  }

  return (
    <nav className="nav_bar_container">
      <button onClick={() => navigate("/")} className="logo_container">
        <img src={logoImage} alt="Logo image" className="logo_image" />

        <h1 className="navbar_logo_title">
          Poke<span>book</span>
        </h1>
      </button>

      <div className="navbar_input_container">
        <Input
          value={pokemonSearch}
          iconPosition="left"
          variant="outlined-light"
          onChange={handleSearchChange}
        />
      </div>

      <ThemeSwitcher />
    </nav>
  );
};
