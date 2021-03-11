import React from "react";

const Persons = ({ person, action }) => {
  return (
    <>
      <div key={person.name}>
        {`${person.name} ${person.number} `}
        <button onClick={action}>Delete</button>
      </div>
    </>
  );
};

export default Persons;
