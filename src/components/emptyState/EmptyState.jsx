import React from "react";
import Empty from "../../assets/emptyState.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./emptyState.scss";

function EmptyState({ desc, title }) {
  return (
    <div className="empty-state">
      <img src={Empty} alt="" />
      <p>{desc}</p>
      <p>
        Go to <Link to="/movies">Home</Link> {title && `and add ${title}`}
      </p>
    </div>
  );
}

EmptyState.propTypes = {
  desc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default EmptyState;
