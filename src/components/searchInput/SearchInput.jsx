import React, { useEffect } from "react";
import "./SearchInput.scss";
import useDebounce from "../../hooks/useDebounce";
import SearchIcon from "../icons/SearchIcon";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function SearchInput({ onSearch }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams({});
  const value = searchParams.get("query");

  const debouncedSearchValue = useDebounce(value, 300);

  const handleFocus = () => {
    pathname !== "/movies" && navigate("/movies");
  };

  useEffect(() => {
    onSearch(debouncedSearchValue);
  }, [debouncedSearchValue, onSearch]);

  return (
    <div className="input-wrapper">
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => setSearchParams({ query: e.target.value })}
        placeholder="Search Movies"
        className="input"
        onFocus={handleFocus}
      />
      <div className="input-search-icon">
        <SearchIcon />
      </div>
    </div>
  );
}

export default SearchInput;
