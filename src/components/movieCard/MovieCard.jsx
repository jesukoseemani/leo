import React, { useEffect, useState } from "react";
import RatingIcon from "../icons/RatingIcon";
import Button from "../button/Button";
import AddIcon from "../icons/AddIcon";
import PlayIcon from "../icons/PlayIcon";
import LoveIcon from "../icons/LoveIcon";
import { IMAGEURL_PATH } from "../../services/apiHandler";
import { useDispatch, useSelector } from "react-redux";
import modalSlice from "../../store/modalSlice";
import RemoveIcon from "../icons/RemoveIcon";
import { findProp } from "../../utils/helperFunction";
import watchLaterSlice from "../../store/watchLaterSlice";
import useToast from "../../hooks/useToast";
import starredSlice from "../../store/starredSlice";

import "./movieCard.scss";
import DeleteIcon from "../icons/DeleteIcon";

function MovieCard({ movie, handler = "general" }) {
  const dispatch = useDispatch();
  const handleShowToast = useToast();

  const { openModal } = modalSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;
  const { starMovie, unstarMovie } = starredSlice.actions;

  const { watchLaterMovies } = useSelector((state) => state.watchLater);
  const { starredMovies } = useSelector((state) => state.starred);

  const [like, setLike] = useState(false);
  const [isInList, setIsInList] = useState(true);
  const [isInFavList, setIsInFavList] = useState(true);

  useEffect(() => {
    const state = findProp(starredMovies, movie?.id);

    setIsInFavList(state);
  }, [isInFavList, starredMovies]);

  useEffect(() => {
    const state = findProp(watchLaterMovies, movie?.id);

    setIsInList(state);
  }, [isInList, watchLaterMovies]);

  const handleLike = () => {
    setLike(true);
    setTimeout(() => {
      setLike(false);
    }, 2000);
    if (isInFavList) {
      dispatch(unstarMovie({ id: movie?.id }));
    } else {
      dispatch(
        starMovie({
          id: movie?.id,
          overview: movie?.overview,
          poster_path: movie?.poster_path,
          title: movie?.title,
          vote_average: movie?.vote_average,
          backdrop_path: movie?.backdrop_path,
        })
      );
    }
  };

  const streamHandler = () => {
    dispatch(
      openModal({
        isModalOpen: true,
        isModalType: "VideoModal",
        isModalProps: { id: movie?.id },
      })
    );
  };

  const watchLaterHandler = () => {
    if (isInList) {
      dispatch(removeFromWatchLater({ id: movie?.id }));
      handleShowToast({
        message: "Successfully Removed",
        type: "success",
        id: Date.now(),
      });
    } else {
      dispatch(
        addToWatchLater({
          id: movie?.id,
          overview: movie?.overview,
          poster_path: movie?.poster_path,
          title: movie?.title,
          vote_average: movie?.vote_average,
          backdrop_path: movie?.backdrop_path,
        })
      );
      handleShowToast({
        message: "Successfully Added",
        type: "success",
        id: Date.now(),
      });
    }
  };

  const deleteHandler = () => {
    dispatch(removeFromWatchLater({ id: movie?.id }));
    handleShowToast({
      message: "Successfully Deleted",
      type: "success",
      id: Date.now(),
    });
  };
  return (
    <div className="movie-wrapper">
      <div className="movie-image-wrapper">
        <img
          className="movie-image"
          src={`${IMAGEURL_PATH}${movie?.poster_path}`}
          alt=""
        />
        <div className="movie-desc">
          <div className="movie-rating">
            <RatingIcon />
            &nbsp;{movie?.vote_average}
          </div>
          {handler !== "general" && (
            <div className="movie-delete">
              <div onClick={deleteHandler}>
                <DeleteIcon />
              </div>
              <div onClick={streamHandler}>
                <PlayIcon color="green" width={16} height={16} />
              </div>
            </div>
          )}
        </div>
        {handler === "general" && (
          <div className="overlay">
            <p className="overlay-content">{movie?.overview}</p>
            <div className="overlay-cta">
              <Button
                title="Stream movie"
                iconState={true}
                iconPosition="left"
                onClick={streamHandler}
                icon={<PlayIcon width="20px" height="20px" />}
                style={{
                  color: "white",
                  fontSize: "16px",
                  width: "100%",
                  height: "48px",
                  radius: "8px",
                  background: "#D40D1F",
                }}
              />

              {handler !== "watchlist" && (
                <Button
                  title="Add to watchlist"
                  iconState={true}
                  iconPosition="right"
                  onClick={watchLaterHandler}
                  icon={
                    isInList ? (
                      <RemoveIcon />
                    ) : (
                      <AddIcon width="12px" height="12px" />
                    )
                  }
                  style={{
                    color: "white",
                    fontSize: "16px",
                    width: "100%",
                    height: "48px",
                    radius: "8px",
                    background: "rgba(249, 249, 249, 0.20)",
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="movie-content-wrapper">
        <h3>{movie?.title}</h3>
        <div onClick={handleLike}>
          <LoveIcon color={isInFavList ? "#D40D1F" : ""} />
        </div>
      </div>
      <div className={`like-icon ${like ? "liked" : ""}`}>
        <LoveIcon color="#D40D1F" width="52" height="52" />
      </div>
    </div>
  );
}

export default MovieCard;
