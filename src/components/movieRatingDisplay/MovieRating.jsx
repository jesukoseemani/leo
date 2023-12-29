import React from "react";
import { roundToNearestWholeNumber } from "../../utils/helperFunction";
import StarIcon from "../icons/StarIcon";
import StarIconFilled from "../icons/StarIconFilled";

function MovieRating({ rating = 10 }) {
  const totalStars = 5;
  const activeStars = roundToNearestWholeNumber(rating);
  return (
    <div>
      {[...new Array(totalStars)].map((arr, index) => {
        return index < activeStars ? (
          <StarIconFilled key={index} />
        ) : (
          <StarIcon key={index} />
        );
      })}
    </div>
  );
}

export default MovieRating;
