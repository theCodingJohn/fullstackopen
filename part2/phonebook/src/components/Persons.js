import React from "react";

const Persons = ({ persons }) => {
  return (
    <>
      {persons?.map((el) => (
        <p key={el.name}>
          {el.name} {el.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
