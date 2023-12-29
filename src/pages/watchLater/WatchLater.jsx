import React from "react";
import PageList from "../../components/pageList/PageList";
import { useSelector } from "react-redux";

function WatchLater() {
  const { watchLaterMovies } = useSelector((state) => state.watchLater);

  return <PageList data={watchLaterMovies} handler="watchlist" />;
}

export default WatchLater;
