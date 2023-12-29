import React from "react";
import { useSelector } from "react-redux";
import PageList from "../../components/pageList/PageList";

function Favourites() {
  const { starredMovies } = useSelector((state) => state.starred);

  return <PageList data={starredMovies} handler="favourite" />;
}

export default Favourites;
