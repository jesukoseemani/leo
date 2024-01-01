import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LayoutRoutes from "./LayoutRoutes";
import Movies from "../pages/movies/Movies";
import Favourites from "../pages/favourites/Favourites";
import WatchLater from "../pages/watchLater/WatchLater";
import NotFound from "../pages/notFound/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<LayoutRoutes />}>
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
