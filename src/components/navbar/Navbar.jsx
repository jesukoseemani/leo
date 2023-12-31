import React from "react";
import SearchInput from "../searchInput/SearchInput";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../store/moviesSlice";
import {
  ENDPOINT_DISCOVER,
  ENDPOINT_SEARCH,
} from "../../services/apis/movieListApi";

import "./navbar.scss";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { pathname } = location;
  const { starredMovies } = useSelector((state) => state.starred);
  const { watchLaterMovies } = useSelector((state) => state.watchLater);

  const routeToHome = () => {
    navigate("/movies");
  };

  const onSearch = (query) => {
    if (query) {
      if (query.length > 1) {
        dispatch(fetchMovies(ENDPOINT_SEARCH(query)));
      } else {
        dispatch(fetchMovies(ENDPOINT_DISCOVER(1)));
      }
    }
  };
  return (
    <ContentWrapper>
      <div className="nav-wrapper">
        <h3 onClick={routeToHome} className="nav-logo" role="banner">
          ML
        </h3>
        <div className="nav-search">
          <SearchInput onSearch={onSearch} />
        </div>
        <div className="nav-link-wrapper" data-testid="navbar-link-container">
          <NavLink
            activeclassname="active"
            className="nav-link"
            to="/favourites"
            role="link"
          >
            FAVOURITES
            {starredMovies?.length > 0 && pathname !== "/favourites" && (
              <span className="number-tag">{starredMovies?.length}</span>
            )}
          </NavLink>
          <NavLink className="nav-link" to="/watch-later">
            WATCH LATER
            {watchLaterMovies?.length > 0 && pathname !== "/watch-later" && (
              <span className="number-tag">{watchLaterMovies?.length}</span>
            )}
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
