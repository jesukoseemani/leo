import React from "react";
import SearchInput from "../searchInput/SearchInput";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../store/moviesSlice";
import {
  ENDPOINT_DISCOVER,
  ENDPOINT_SEARCH,
} from "../../services/apis/movieListApi";

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
            activeclassname="active"
            className="nav-link"
            to="/favourites"
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
