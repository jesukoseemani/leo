import React from "react";
import { useFetch } from "../../../hooks/useFetch";
import { ENDPOINT_MOVIE } from "../../../services/apis/movieListApi";
import YoutubePlayer from "../../reactPlayer/YoutubePlayer";
import ModalCloseIcon from "../../icons/ModalCloseIcon";
import PropTypes from "prop-types";

import "./videoModal.scss";

function VideoModal({ id, onClose }) {
  const { data, isPending } = useFetch(ENDPOINT_MOVIE(id));
  const videoKey = () => {
    const trailer = data?.videos?.results?.find(
      (vid) => vid.type === "Trailer"
    );
    if (trailer) {
      return trailer.key;
    } else {
      return data.results[0].key;
    }
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {isPending ? (
        <h1 className="loading-state">LOADING...</h1>
      ) : (
        <div style={{ width: "100%", height: "100%" }}>
          <div className="close" onClick={onClose}>
            <ModalCloseIcon />
          </div>
          <YoutubePlayer videoKey={videoKey()} />
        </div>
      )}
    </div>
  );
}

VideoModal.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VideoModal;
