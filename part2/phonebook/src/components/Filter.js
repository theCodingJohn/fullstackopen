import React from "react";

const Filter = ({ value, action }) => {
  return (
    <div>
      filter shown with <input onChange={action} value={value} />
    </div>
  );
};

export default Filter;
