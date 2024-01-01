import React from "react";
import Empty from "../../assets/emptyState.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./emptyState.scss";

function EmptyState({ desc, title, isSearchEmpty = false }) {
  return (
    <div className="empty-state">
      <img src={Empty} alt="" />
      <p>{desc}</p>
      {isSearchEmpty ? (
        <p>please, search for another movie</p>
      ) : (
        <p>
          Go to <Link to="/movies">Home</Link> {title && `and add ${title}`}
        </p>
      )}
    </div>
  );
}

EmptyState.defaultProps = {
  isSearchEmpty: false,
};

EmptyState.propTypes = {
  desc: PropTypes.string.isRequired,
  title: PropTypes.string,
  isSearchEmpty: PropTypes.bool,
};

export default EmptyState;
