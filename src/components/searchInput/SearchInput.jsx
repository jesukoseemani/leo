import React, { useEffect, useState } from "react";
import "./SearchInput.scss";
import useDebounce from "../../hooks/useDebounce";
import SearchIcon from "../icons/SearchIcon";
import { useNavigate } from "react-router-dom";

function SearchInput({ onSearch }) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const handleFocus = () => {
    navigate("/movies");
  };

  useEffect(() => {
    onSearch(debouncedSearchValue);
  }, [debouncedSearchValue, onSearch]);

  return (
    <div className="input-wrapper">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
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
