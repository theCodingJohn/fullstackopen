import React from "react";

const FilterButton = ({ handleClick, name }) => {
  return <button onClick={handleClick}>{name}</button>;
};

export default FilterButton;
