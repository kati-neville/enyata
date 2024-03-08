import { ReactNode, useEffect } from "react";
import { THEME } from "./utils/constants";
import { handleSetTheme } from "./utils";
import { Spinner } from "@/components/spinner";
import { Themes } from "@/components/theme-switcher";
import { useQueryPokemons } from "./utils/hooks/use-query";

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const { loading } = useQueryPokemons();

  useEffect(() => {
    const selectedTheme = localStorage.getItem(THEME);
    if (selectedTheme) {
      document.documentElement.setAttribute("data-theme", selectedTheme);
    } else {
      handleSetTheme(Themes.PINK);
    }
  }, []);

  if (loading) {
    return (
      <div className="spinner_container">
        <Spinner />
      </div>
    );
  }
  return <>{children}</>;
};
