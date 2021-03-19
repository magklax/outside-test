import React from "react";

const MainButton = ({ handleClick }) => (
  <button
    onClick={handleClick}
    type="button"
    className="main-button button button--red button--normal"
    aria-label="open popup"
  >
    Налоговый вычет
  </button>
);

export default MainButton;
