import React from "react";
import "./movieBanner.scss";
import Button from "../button/Button";
import PlayIcon from "../icons/PlayIcon";
import RatingIcon from "../icons/RatingIcon";
import { BACKDROPIMAGEURL_PATH } from "../../services/apiHandler";
import { useDispatch } from "react-redux";
import modalSlice from "../../store/modalSlice";

function MovieBanner({ movie }) {
  const dispatch = useDispatch();
  const { openModal } = modalSlice.actions;

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

export default MovieBanner;
