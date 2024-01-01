import React from "react";
import Button from "../button/Button";
import PlayIcon from "../icons/PlayIcon";
import RatingIcon from "../icons/RatingIcon";
import { BACKDROPIMAGEURL_PATH } from "../../services/apiHandler";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modalSlice";
import PropTypes from "prop-types";

import "./movieBanner.scss";

function MovieBanner({ movie }) {
  const dispatch = useDispatch();

  const streamHandler = () => {
    dispatch(
      openModal({
        isModalOpen: true,
        isModalType: "VideoModal",
        isModalProps: { id: movie?.id },
      })
    );
  };
  return (
    <div className="movie-banner-wrapper">
      <img
        className="movie-banner-image"
        src={`${BACKDROPIMAGEURL_PATH}${movie?.backdrop_path}`}
        alt=""
      />
      <h3 className="movie-banner-title">{movie?.title}</h3>
      <div className="movie-banner-button">
        <Button
          title="STREAM NOW"
          iconState={true}
          iconPosition="left"
          icon={<PlayIcon />}
          onClick={streamHandler}
        />
      </div>

      <div className="movie-banner-rating">
        <RatingIcon />
        &nbsp;{movie?.vote_average}
      </div>
    </div>
  );
}
MovieBanner.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number,
    backdrop_path: PropTypes.string,
    release_date: PropTypes.string,
  }),
};

export default MovieBanner;
