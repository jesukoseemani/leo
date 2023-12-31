import React from "react";
import Button from "../../components/button/Button";
import MovieBanner from "../../components/movieBanner/MovieBanner";
import MovieCard from "../../components/movieCard/MovieCard";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import EmptyState from "../../components/emptyState/EmptyState";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import "./pageList.scss";

function PageList({ data, handler, onClear }) {
  const dispatch = useDispatch();

  const clearHandler = () => {
    dispatch(onClear());
  };
  const STYLES = {
    color: "white",
    fontSize: "14px",
    width: "139px",
    height: "50px",
    radius: "4",
    background: "black",
  };
  return (
    <ContentWrapper>
      <div className="page-list-header">
        <h3 className="page-list-heading">{handler}</h3>
        {data.length > 0 && (
          <Button
            onClick={clearHandler}
            title="Clear All"
            iconState={false}
            style={STYLES}
          />
        )}
      </div>

      {data.length <= 0 ? (
        <EmptyState
          desc={`Sorry!!, your ${handler} list is empty`}
          title={handler}
        />
      ) : (
        <>
          <div className="page-list-banner">
            <MovieBanner movie={data[0]} />
          </div>

          <div className="page-list-grid">
            {data
              ?.filter((_, i) => i !== 0)
              .map((movie, i) => (
                <MovieCard
                  key={i}
                  movie={movie}
                  handler={handler}
                  data={data}
                />
              ))}
          </div>
        </>
      )}
    </ContentWrapper>
  );
}

PageList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      overview: PropTypes.string,
      poster_path: PropTypes.string,
      title: PropTypes.string,
      vote_average: PropTypes.number,
      backdrop_path: PropTypes.string,
    })
  ),
  handler: PropTypes.oneOf(["favourite", "watchlist"]).isRequired,
  onClear: PropTypes.func.isRequired,
};

export default PageList;
