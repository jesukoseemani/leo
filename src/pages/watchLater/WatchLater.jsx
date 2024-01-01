import React from "react";
import PageList from "../../components/pageList/PageList";
import { useSelector } from "react-redux";
import { removeAllWatchLater } from "../../store/watchLaterSlice";

function WatchLater() {
  const { watchLaterMovies } = useSelector((state) => state.watchLater);

  return (
    <PageList
      data={watchLaterMovies}
      handler="watchlist"
      onClear={removeAllWatchLater}
      data-testid="ml"
    />
  );
}

export default WatchLater;
