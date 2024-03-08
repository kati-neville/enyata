import "./paginator.css";
import caret from "@assets/svgs/caret-right.svg";
import caretDown from "@assets/svgs/caret-down.svg";
import { useState } from "react";
import { useNavigateParams } from "@/utils/hooks/use-navigate";
import { useSearchParams } from "react-router-dom";
import { LIMIT, PAGE, SEARCH } from "@/utils/constants";
import { Pagination } from "react-headless-pagination";
import { handleGetPersistedPokemons } from "@/utils";
import { useFilterData } from "@/utils/hooks/use-filter-data";

interface PaginatorProps {}

export const limits = [8, 12, 16, 24];

export const Paginator: React.FC<PaginatorProps> = () => {
  const navigate = useNavigateParams();
  const [searchParams] = useSearchParams();
  const [showLimitOptions, setShowLimitoptions] = useState(false);
  const displayLimit = searchParams.get(LIMIT) || limits[0].toString();
  const searchItem = searchParams.get(SEARCH) || "";

  // The -1 is a trick as per the react-headless-pagination package implementation
  const page = parseFloat(searchParams.get(PAGE) || "0") - 1;
  const data = handleGetPersistedPokemons();

  const { filteredData } = useFilterData(searchItem, data);

  const totalPages = Math.ceil(
    (searchItem ? filteredData : data)?.length / parseFloat(displayLimit),
  );

  const allParams: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    allParams[key] = value;
  });

  const handleSetLimitUrlParam = (limit: number) => {
    navigate(location.pathname, { ...allParams, [LIMIT]: limit.toString() });
  };
  const handleSetPageUrlParam = (page: number) => {
    navigate(location.pathname, { ...allParams, [PAGE]: page.toString() });
  };

  return (
    <div className="paginator_container">
      <Pagination
        totalPages={totalPages || 1}
        currentPage={page}
        className="paginator_box_container"
        truncableText="..."
        edgePageCount={1}
        // The +1 is a trick as per the react-headless-pagination package implementation
        setCurrentPage={(page) => handleSetPageUrlParam(page + 1)}
        middlePagesSiblingCount={0}
      >
        <Pagination.PrevButton
          disabled={page === 0}
          className={`paginator_box caret_container  ${
            page === 0 ? "disabled" : ""
          }`}
        >
          <img
            src={caret}
            alt="paginator left caret"
            className="left_caret caret"
          />
        </Pagination.PrevButton>

        <ul className="paginator_nav_container">
          <Pagination.PageButton
            inactiveClassName="paginator_inactive"
            activeClassName="paginator_active"
            className="paginator_box"
          />
        </ul>

        <Pagination.NextButton
          className={`paginator_box caret_container ${page === totalPages - 1 ? "disabled" : ""}`}
        >
          <img src={caret} alt="paginator right caret" className="caret" />
        </Pagination.NextButton>
      </Pagination>

      <div className="paginator_limit_container">
        <button
          onClick={() => setShowLimitoptions(!showLimitOptions)}
          className="paginator_limit_box"
        >
          <span>{displayLimit}</span>

          <img src={caretDown} alt="paginator limit caret" />
        </button>

        {showLimitOptions ? (
          <ul className="paginator_limit_dropdown_container">
            {limits
              .filter((limit) => limit.toString() !== displayLimit)
              .map((limit, index) => {
                return (
                  <li
                    key={index}
                    className="paginator_limit_dropdown_item"
                    onClick={() => {
                      handleSetLimitUrlParam(limit);
                      setShowLimitoptions(false);
                    }}
                  >
                    {limit}
                  </li>
                );
              })}
          </ul>
        ) : null}
      </div>
    </div>
  );
};
