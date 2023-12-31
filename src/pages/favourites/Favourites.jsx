import React from "react";
import { useSelector } from "react-redux";
import PageList from "../../components/pageList/PageList";
import { clearAllStarred } from "../../store/starredSlice";

function Favourites() {
  const { starredMovies } = useSelector((state) => state.starred);

  return (
    <PageList
      data={starredMovies}
      handler="favourite"
      onClear={clearAllStarred}
    />
  );
}

export default Favourites;
