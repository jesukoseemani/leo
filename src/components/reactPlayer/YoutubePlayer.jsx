import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import useIsMobile from "../../hooks/useIsMobile";

const YoutubePlayer = ({ videoKey }) => {
  const { isMobile } = useIsMobile();
  return (
    <ReactPlayer
      className="video-player"
      url={`https://www.youtube.com/watch?v=${videoKey}`}
      controls={true}
      playing={true}
      width={`${isMobile ? "370px" : "640px"}`}
      data-testid="youtube-player"
    />
  );
};

YoutubePlayer.propTypes = {
  videoKey: PropTypes.string.isRequired,
};

export default YoutubePlayer;
