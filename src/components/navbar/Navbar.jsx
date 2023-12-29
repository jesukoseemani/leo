import React from "react";
import SearchInput from "../searchInput/SearchInput";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../../store/moviesSlice";
import {
  ENDPOINT_DISCOVER,
  ENDPOINT_SEARCH,
} from "../../services/apis/movieListApi";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const routeToHome = () => {
    navigate("/movies");
  };

  const onSearch = (query) => {
    if (query.length > 1) {
      dispatch(fetchMovies(ENDPOINT_SEARCH(query)));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
    }
  };
  return (
    <ContentWrapper>
      <div className="nav-wrapper">
        <h3 onClick={routeToHome} className="nav-logo">
          ML
        </h3>
        <div className="nav-search">
          <SearchInput onSearch={onSearch} />
        </div>
        <div className="nav-link-wrapper">
          <NavLink
            activeClassName="active"
            className="nav-link"
            to="/favourites"
          >
            FAVOURITES
          </NavLink>
          <NavLink className="nav-link" to="/watch-later">
            WATCH LATER
          </NavLink>
        </div>
        <div className="nav-link-hamburger">
          <HamburgerMenu />
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Navbar;
