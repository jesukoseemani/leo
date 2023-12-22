import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "../styles/header.scss";

const Header = ({ searchMovies }) => {
  const { starredMovies } = useSelector((state) => state.starred);

  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => searchMovies("")}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          to="/starred"
          data-testid="nav-starred"
          className="nav-starred"
        >
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        {/* Using a Link component from React Router to wrap an input and handling
        the onClick event to trigger a search is generally not good approach. If the goal is to clear the search query and potentially trigger a search when the user clicks a link, consider using a separate button or a clickable element for this purpose. OR clear the search upon route changes  */}
        <Link to="/" onClick={(e) => searchMovies("")} className="search-link">
          {/* Consider adding a debounce to the onKeyUp event. Debouncing can help reduce the number of requests sent while the user is typing. It ensures that the search function is only called after a certain delay when the user stops typing. */}

          {/* Instead of onKeyUp, you might consider using the onChange event to trigger the search function. This way, the search function is called when the user finishes typing and moves out of the input field. */}

          <input
            type="search"
            data-testid="search-movies"
            onKeyUp={(e) => searchMovies(e.target.value)}
            className="form-control rounded"
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-describedby="search-addon"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
