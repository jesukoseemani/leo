import React, { useState, useEffect } from "react";
import MovieRating from "../movieRatingDisplay/MovieRating";
import Button from "../button/Button";
import PlayIcon from "../icons/PlayIcon";
import AddIcon from "../icons/AddIcon";
import { BACKDROPIMAGEURL_PATH } from "../../services/apiHandler";
import { useDispatch, useSelector } from "react-redux";
import watchLaterSlice from "../../store/watchLaterSlice";
import modalSlice from "../../store/modalSlice";
import useToast from "../../hooks/useToast";
import { findProp } from "../../utils/helperFunction";
import RemoveIcon from "../icons/RemoveIcon";
import "./movieHeader.scss";

function MovieHeader({ data }) {
  const dispatch = useDispatch();
  const handleShowToast = useToast();
  const [isInList, setIsInList] = useState(true);
  const { watchLaterMovies } = useSelector((state) => state.watchLater);
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;
  const { openModal } = modalSlice.actions;
  const IMAGESTYLE = {
    background: `linear-gradient(rgba(18, 24, 41, 0.7), rgba(18, 24, 41, 0.7)), url(${BACKDROPIMAGEURL_PATH}${data?.backdrop_path}) center/cover no-repeat`,
  };
  useEffect(() => {
    const state = findProp(watchLaterMovies, data?.id);

    setIsInList(state);
  }, [isInList, watchLaterMovies]);

  const watchLaterHandler = () => {
    if (isInList) {
      dispatch(removeFromWatchLater({ id: data?.id }));
      handleShowToast({
        message: "Successfully Removed",
        type: "success",
        id: Date.now(),
      });
    } else {
      dispatch(
        addToWatchLater({
          id: data?.id,
          overview: data?.overview,
          poster_path: data?.poster_path,
          title: data?.title,
          vote_average: data?.vote_average,
          backdrop_path: data?.backdrop_path,
        })
      );
      handleShowToast({
        message: "Successfully Added",
        type: "success",
        id: Date.now(),
      });
    }
  };

  const streamHandler = () => {
    dispatch(
      openModal({
        isModalOpen: true,
        isModalType: "VideoModal",
        isModalProps: { id: data?.id },
      })
    );
  };
  return (
    <div style={IMAGESTYLE} className="movie-header-wrapper">
      <h1 className="movie-header-heading">{data?.title}</h1>
      <div className="movie-header-genre">
        <p className="movie-header-paragraph">{data?.release_date}</p>
      </div>
      <p className="movie-header-fade">{data?.overview}</p>
      <div className="movie-header-rating">
        <MovieRating rating={data?.vote_average} />
      </div>

      <div className="movie-header-button">
        <Button
          title="STREAM NOW"
          iconState={true}
          onClick={streamHandler}
          iconPosition="right"
          icon={<PlayIcon width="20px" height="20px" />}
          style={{
            color: "white",
            fontSize: "16px",
            width: "272px",
            height: "44px",
            radius: "10px",
            background: "#D40D1F",
          }}
        />

        <Button
          title="Watchlist"
          iconState={true}
          iconPosition="left"
          onClick={watchLaterHandler}
          icon={
            isInList ? <RemoveIcon /> : <AddIcon width="12px" height="12px" />
          }
          style={{
            color: "white",
            fontSize: "16px",
            width: "258px",
            height: "44px",
            radius: "10px",
            background: "rgba(249, 249, 249, 0.20)",
          }}
        />
      </div>
    </div>
  );
}

export default MovieHeader;
