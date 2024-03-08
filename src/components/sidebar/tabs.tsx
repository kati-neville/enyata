import { TAB } from "@/utils/constants";
import { useNavigateParams } from "@/utils/hooks/use-navigate";
import { useLocation, useSearchParams } from "react-router-dom";

export enum TAB_VALUES {
  ABOUT = "About",
  STATS = "Stats",
  SIMILAR = "Similar",
}

function TabItem({ name }: { name: TAB_VALUES }) {
  const location = useLocation();
  const navigate = useNavigateParams();
  const [searchParams] = useSearchParams();
  const allParams: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    allParams[key] = value;
  });

  const navigateHandler = () => {
    navigate(location.pathname, {
      ...allParams,
      [TAB]: name.toLowerCase(),
    });
  };

  const isActive = searchParams.get(TAB) === name.toLowerCase();

  return (
    <button
      onClick={navigateHandler}
      className={`sidebar_tab_item ${isActive ? "active" : "inactive"}`}
    >
      {name}
    </button>
  );
}

export const Tabs = () => {
  return (
    <div className="sidebar_tabs">
      <TabItem name={TAB_VALUES.ABOUT} />
      <TabItem name={TAB_VALUES.STATS} />
      <TabItem name={TAB_VALUES.SIMILAR} />
    </div>
  );
};
